import { commentNotificationService } from "../helpers/notificationService.js";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import { io } from "../server.js";

export const fetchComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({
            parentPost: postId,
            parentComment: null,
        }).populate("author", "username avatar");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchReplies = async (req, res) => {
    try {
        const { commentId } = req.params;
        const replies = await Comment.find({
            parentComment: commentId,
        })
            .populate("author", "username avatar")
            .populate("mention", "username avatar");
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const { _id: userId, username, avatar } = req.user;
        const { text, parentPost, parentComment, replyTo } = req.body;

        const comment = await Comment.create({
            text,
            author: userId,
            parentPost,
            parentComment,
            replyTo,
        });

        const parentCommentUpdate = await Comment.findByIdAndUpdate(
            parentComment,
            {
                $inc: { replyCount: 1 },
            },
            { returnDocument: "after" }
        );

        const replyToUpdate = await Comment.findByIdAndUpdate(
            replyTo,
            {
                $inc: { replyCount: 1 },
            },
            { returnDocument: "after" }
        );

        const parentPostUpdate = await Post.findByIdAndUpdate(
            parentPost,
            {
                $addToSet: { replies: comment._id },
            },
            { returnDocument: "after" }
        );

        await comment.populate([
            { path: "author", select: "username avatar" },
            {
                path: "replyTo",
                select: "author text",
                populate: {
                    path: "author",
                    select: "username name avatar",
                },
            },
        ]);

        // Emit new and updated comments to feed:post (commentUpdate, parentPostUpdate)
        // Emit to clan and user feed (parentPostUpdate)
        // Emit notification to users (parentPost author, parentComment author)

        await parentPostUpdate.populate("author", "username avatar");

        io.to(`feed:post:${parentPost.toString()}`).emit(
            "new_comment",
            comment
        );

        const authIsPostAuthor = userId.equals(parentPostUpdate.author);
        const authReplyingSelf =
            userId.equals(parentCommentUpdate.author) ||
            userId.equals(replyToUpdate.author);

        io.to(`feed:post:${parentPost}`)
            .to(`feed:user:${parentPostUpdate.author.toString()}`)
            .to(`feed:clan:${parentPostUpdate.clan.toString()}`)
            .emit("updated_post", {
                _id: parentPost,
                replyCount: parentPostUpdate.replyCount,
            });

        parentComment &&
            io.to(`feed:post:${parentPost}`).emit("updated_comment", {
                _id: parentComment,
                replyCount: parentCommentUpdate.replyCount,
            });

        replyToUpdate &&
            io.to(`feed:post:${parentPost}`).emit("updated_comment", {
                _id: replyTo,
                replyCount: replyToUpdate.replyCount,
            });

        if (!(authIsPostAuthor || authReplyingSelf)) {
            const postAuthorNotification = await commentNotificationService(
                "post_comment",
                comment._id,
                parentPostUpdate.author._id,
                {
                    username,
                    avatar: avatar.url,
                    comment: text,
                }
            );

            const parentCommentNotification = parentComment
                ? await commentNotificationService(
                      "comment_reply",
                      userId,
                      parentCommentUpdate.author,
                      { username, avatar: avatar.url, comment: text }
                  )
                : null;

            const replyToNotification = replyTo
                ? await commentNotificationService(
                      "comment_reply",
                      userId,
                      replyToUpdate.author,
                      { username, avatar: avatar.url, comment: text }
                  )
                : null;

            io.to(parentPostUpdate.author._id.toString()).emit(
                "notification",
                postAuthorNotification
            );

            parentCommentNotification &&
                io
                    .to(parentCommentUpdate.author.toString())
                    .emit("notification", parentCommentNotification);

            replyToNotification &&
                io
                    .to(replyToUpdate.author.toString())
                    .emit("notification", replyToNotification);
        }

        res.status(201).json({ msg: "Comment created" });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error);
    }
};

export const toggleCommentLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) return res.status(404).json({ msg: "Comment not found" });

        const isLiked = comment.likes.includes(req.user._id);

        const update = isLiked
            ? { $pull: { likes: req.user._id } }
            : { $addToSet: { likes: req.user._id } };

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            update,
            {
                returnDocument: "after",
            }
        );

        await updatedComment.populate("author", "username avatar");

        io.emit("updated_comment", updatedComment);

        res.status(200).json({
            msg: isLiked ? "Like removed" : "Like added",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });

        console.error(error);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ msg: "Comment not found" });

        if (!comment.author.equals(userId)) {
            return res.status(403).json({ msg: "Authorization failed." });
        }

        const parentPost = await Post.findById(comment.parentPost).populate(
            "author",
            "username avatar"
        );

        if (!comment.parentComment) {
            const childComments = await Comment.find({
                parentComment: comment._id,
            });

            for (const comment of childComments) {
                parentPost.replies = parentPost.replies.filter(
                    (id) => !id.equals(comment._id)
                );
                await comment.deleteOne();
            }
        } else {
            const parentComment = await Comment.findByIdAndUpdate(
                comment.parentComment,
                {
                    $pull: { replies: comment._id },
                },
                { returnDocument: "after" }
            );

            await parentComment.populate("author", "username avatar");
            io.emit("updated_comment", parentComment);
        }

        if (comment.replyTo) {
            const replyTo = await Comment.findByIdAndUpdate(
                comment.replyTo,
                {
                    $pull: { replies: comment._id },
                },
                { returnDocument: "after" }
            );

            await replyTo.populate("author", "username avatar");
            io.emit("updated_comment", replyTo);
        }

        parentPost.replies = parentPost.replies.filter(
            (id) => !id.equals(comment._id)
        );

        await comment.deleteOne();
        await parentPost.save();

        io.emit("updated_post", parentPost);

        res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error);
    }
};
