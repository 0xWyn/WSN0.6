import mongoose from "mongoose";
import { commentNotificationService } from "../helpers/notificationService.js";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import { io } from "../server.js";
import { shouldNotify } from "../helpers/shouldNotify.js";
import Like from "../models/likeModel.js";

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

        // LEGEND
        // parentPostUpdate => ppu
        // parentCommentUpdate => pcu
        // replyToUpdate => rtu

        // ppn => notification for parentPost author
        // pcn => notification for parentComment author
        // rtn => notification for replyTo author;

        let comment;

        let ppu;
        let pcu;
        let rtu;

        let ppn;
        let pcn;
        let rtn;

        const session = await mongoose.connection.startSession();

        try {
            await session.withTransaction(async () => {
                // 1. CREATE COMMENT
                [comment] = await Comment.create(
                    [
                        {
                            text,
                            author: userId,
                            parentPost,
                            parentComment,
                            replyTo,
                        },
                    ],
                    { session }
                );

                // POPULATE COMMENT FOR RETURNING
                await comment.populate(
                    [
                        { path: "author", select: "username name avatar" },
                        {
                            path: "replyTo",
                            select: "author text",
                            populate: {
                                path: "author",
                                select: "username name avatar",
                            },
                        },
                    ],
                    { session }
                );

                // CREATE METADATA OBJECT
                const meta = {
                    username: comment.author?.username,
                    avatar: comment.author.avatar?.url,
                    comment: text,
                    postId: parentPost,
                };

                // INCREMEMENT PARENT POST REPLY COUNT
                ppu = await Post.findByIdAndUpdate(
                    parentPost,
                    {
                        $unset: { replies: "" },
                        $inc: { replyCount: 1 },
                    },
                    { returnDocument: "after", session }
                );

                // CREATE PARENT POST NOTIFICATION (PPN)
                if (shouldNotify(ppu.author, userId)) {
                    ppn = await commentNotificationService(
                        "post_comment",
                        comment._id,
                        ppu.author,
                        meta,
                        { session }
                    );
                }

                // INCREMENT PARENT COMMENT OR RETURN NULL
                if (parentComment) {
                    pcu = await Comment.findByIdAndUpdate(
                        parentComment,
                        {
                            $inc: { replyCount: 1 },
                        },
                        { returnDocument: "after", session }
                    );

                    if (shouldNotify(pcu.author, userId)) {
                        pcn = await commentNotificationService(
                            "comment_reply",
                            comment._id,
                            pcu.author,
                            meta,
                            { session }
                        );
                    }
                }

                // INCREMENT REPLYTO COMMENT OR RETURN NULL
                if (replyTo) {
                    rtu = await Comment.findByIdAndUpdate(
                        replyTo,
                        {
                            $inc: { replyCount: 1 },
                        },
                        { returnDocument: "after", session }
                    );

                    if (shouldNotify(rtu.author, userId)) {
                        rtn = await commentNotificationService(
                            "comment_reply",
                            comment._id,
                            rtu.author,
                            meta,
                            { session }
                        );
                    }
                }
            });
        } finally {
            await session.endSession();
        }

        // UPDATE PARENT POST AND RELEVANT COMMENTS IN FEED

        const postRoom = io.to(`feed:post:${parentPost}`);
        //  .1 Emit comment
        postRoom.emit("new_comment", comment);

        // .2 Emit PPU
        postRoom
            .to(`feed:user:${ppu.author.toString()}`)
            .to(`feed:clan:${ppu.clan.toString()}`)
            .emit("updated_post", {
                _id: parentPost,
                replyCount: ppu.replyCount,
            });

        if (ppn) {
            io.to(ppu.author.toString()).emit("notification", ppn);
        }

        // .3 Emit PCU
        if (pcu) {
            postRoom.emit("updated_comment", {
                _id: pcu._id,
                replyCount: pcu.replyCount,
            });

            if (pcn) io.to(pcu.author.toString()).emit("notification", pcn);
        }

        // .4 Emit RTU
        if (rtu) {
            postRoom.emit("updated_comment", {
                _id: rtu._id,
                replyCount: rtu.replyCount,
            });

            if (rtn) io.to(rtu.author.toString()).emit("notification", rtn);
        }

        res.status(201).json({ msg: "Comment created" });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error);
    }
};

export const likeComment = async (req, res) => {
    try {
        const { _id: userId, username, avatar } = req.user;
        const { commentId } = req.params;

        const session = await mongoose.startSession();

        let updatedComment;
        let likeNotification;
        try {
            await session.withTransaction(async () => {
                const like = await Like.create(
                    [
                        {
                            entity: commentId,
                            entityType: "Comment",
                            user: userId,
                        },
                    ],
                    { session }
                );

                updatedComment = await Comment.findByIdAndUpdate(
                    commentId,
                    {
                        $inc: { likeCount: 1 },
                    },
                    { returnDocument: "after", session }
                );

                if (like && updatedComment) {
                    likeNotification = await commentNotificationService(
                        "comment_like",
                        commentId,
                        updatedComment.author,
                        {
                            username,
                            avatar: avatar.url,
                            postId: updatedComment.parentPost,
                        },
                        { session }
                    );
                }
            });
        } catch (error) {
            if (error.code === 11000) {
                return res
                    .status(409)
                    .json({ error: "You already like this comment." });
            }
            throw error;
        } finally {
            await session.endSession();
        }

        if (likeNotification) {
            io.to(updatedComment.author.toString()).emit(
                "notification",
                likeNotification
            );
        }

        if (updatedComment)
            io.to(`feed:post:${updatedComment.parentPost.toString()}`)
                .to(`feed:user:${updatedComment.author.toString()}`)
                .emit("updated_comment", updatedComment);

        return res.status(200).json({
            msg: "Comment liked.",
            updatedComment: {
                _id: commentId,
                likeCount: updatedComment.likeCount,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: error.response });
    }
};

export const unlikeComment = async (req, res) => {
    try {
        const { _id: userId, username, avatar } = req.user;
        const { commentId } = req.params;

        const session = await mongoose.startSession();

        let updatedComment;
        try {
            await session.withTransaction(async () => {
                const existingLike = await Like.exists(
                    [
                        {
                            entity: commentId,
                            entityType: "Comment",
                            user: userId,
                        },
                    ],
                    { session }
                );

                if (!existingLike) {
                    return res.status(404).json({ error: "Like not found." });
                }

                updatedComment = await Comment.findByIdAndUpdate(
                    commentId,
                    {
                        $inc: { likeCount: -1 },
                    },
                    { returnDocument: "after", session }
                );

                await Like.findByIdAndDelete(userId, { session });
            });
        } finally {
            await session.endSession();
        }

        if (updatedComment)
            io.to(`feed:post:${updatedComment.parentPost.toString()}`)
                .to(`feed:user:${updatedComment.author.toString()}`)
                .emit("updated_comment", updatedComment);

        return res.status(200).json({
            msg: "Comment unliked.",
            updatedComment: {
                _id: commentId,
                likeCount: updatedComment.likeCount,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: error.response });
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
