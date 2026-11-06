import mongoose from "mongoose";

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
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        likeCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        replyCount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

commentSchema.index({
    text: "text",
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
