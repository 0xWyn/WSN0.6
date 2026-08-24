import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MONGODB");

    const comments = await Comment.find({});

    for (const comment of comments) {
        const post = await Post.findByIdAndUpdate(comment.parentPost, {
            $addToSet: { replies: comment._id },
        });

        if (comment.parentComment) {
            const parentComment = await Comment.findByIdAndUpdate(
                comment.parentComment,
                {
                    $addToSet: { replies: comment._id },
                }
            );

            await parentComment.save();
        }

        await comment.save();
        await post.save();
    }

    console.log("Done");

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
