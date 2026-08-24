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
        let changed = false;

        const post = await Post.findByIdAndUpdate(comment.parentPost, {
            $addToSet: { replies: comment._id },
        });

        changed = true;

        if (changed) {
            await post.save();
            console.log(`Updated post ${post._id}`);
        }
    }

    console.log("Done");

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
