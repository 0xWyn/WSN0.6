import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        text: String,
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
        clan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clan",
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
