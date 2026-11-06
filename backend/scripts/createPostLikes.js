import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/postModel.js";
import Like from "../models/likeModel.js";
import Comment from "../models/commentModel.js";

dotenv.config();

async function createPostLikes() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MONGODB");

    const posts = await Comment.find();

    for (const post of posts) {
        const likes = post.likes;

        await Promise.all(
            likes.map((userId) => {
                Like.create({
                    user: userId,
                    entityType: "Comment",
                    entity: post._id,
                });
            })
        );

        post.likeCount = likes.length;
        post.likes = undefined;

        await post.save();
    }

    console.log("Done");

    await mongoose.disconnect();
}

createPostLikes().catch((err) => {
    console.error(err);
    process.exit(1);
});
