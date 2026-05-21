import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        text: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        parentPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        replyCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
