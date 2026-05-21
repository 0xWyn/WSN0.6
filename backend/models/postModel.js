import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        text: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        media: [
            {
                type: {
                    type: String,
                    enum: ["image", "video"],
                    required: true,
                },
                url: { type: String, required: true },
            },
        ],
        likes: [{ type: mongoose.Schema.Types.ObjectId }],
        replyCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
