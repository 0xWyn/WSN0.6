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
        }).populate("author", "username avatar");
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const { text, parentPost, parentComment } = req.body;
        const comment = await Comment.create({
            text,
            author: req.user.id,
            parentPost,
            parentComment: parentComment || null,
        });
        if (parentComment) {
            await Comment.findByIdAndUpdate(parentComment, {
                $inc: { replyCount: 1 },
            });
        }
        const post = await Post.findByIdAndUpdate(parentPost, {
            $inc: { replyCount: 1 },
        });
        io.emit("new_comment", comment);
        res.status(201).json({ msg: "Comment created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const toggleCommentLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ msg: "Comment not found" });
        const isLiked = comment.likes.includes(req.user.id);

        const update = isLiked
            ? { $pull: { likes: req.user.id } }
            : { $addToSet: { likes: req.user.id } };

        const updated = await Comment.findByIdAndUpdate(commentId, update, {
            returnDocument: "after",
        });
        io.emit("updated_comment", updated);
        res.status(200).json({
            msg: isLiked ? "Like removed" : "Like added",
            updated,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
