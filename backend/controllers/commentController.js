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
            .populate({
                path: "replyTo",
                select: "text author",
                populate: {
                    path: "author",
                    select: "username name avatar",
                },
            });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const { text, parentPost, parentComment, replyTo } = req.body;
        const comment = await Comment.create({
            text,
            author: req.user._id,
            parentPost,
            parentComment,
            replyTo,
        });

        const parentCommentUpdate = parentComment
            ? await Comment.findByIdAndUpdate(
                  parentComment,
                  {
                      $addToSet: { replies: comment._id },
                  },
                  { returnDocument: "after" }
              )
            : null;

        const replyToUpdate = replyTo
            ? await Comment.findByIdAndUpdate(
                  replyTo,
                  {
                      $addToSet: { replies: comment._id },
                  },
                  { returnDocument: "after" }
              )
            : null;

        const postUpdate = await Post.findByIdAndUpdate(
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

        io.emit("new_comment", comment);

        if (parentComment) {
            await parentCommentUpdate.populate("author", "username avatar");

            io.emit("updated_comment", parentCommentUpdate);
        }

        if (replyTo) {
            await replyToUpdate.populate("author", "username avatar");
            io.emit("updated_comment", replyToUpdate);
        }

        await postUpdate.populate("author", "username avatar");

        io.emit("updated_post", postUpdate);

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
