import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MONGODB");

    const deletedComments = await Comment.deleteMany({});

    const updatedPosts = await Post.updateMany({}, { $set: { replyCount: 0 } });

    console.log(deletedComments);
    console.log(updatedPosts);

    console.log("Done");

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
