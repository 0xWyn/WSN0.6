import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/postModel.js";
import Clan from "../models/clanModel.js";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDb 🚀");

    const posts = Post.find({ clan: { $ne: null } })
        .populate("clan", "name status")
        .cursor();

    const updated = await Post.collection.updateMany(
        { replies: { $exists: true } },
        { $unset: { replies: "" } }
    );

    console.log(
        "MATCHED:",
        updated.matchedCount,
        "UPDATED:",
        updated.modifiedCount,
        "Free to remove replies from model now".toUpperCase()
    );

    let count = 0;
    for await (const post of posts) {
        post.metadata = {
            clanSnapshot: {
                _id: post.clan._id,
                name: post.clan.name,
                status: post.clan.status,
            },
        };
        await post.save();
        count++;
    }

    console.log(`Updated ${count} posts`);

    await mongoose.disconnect();
}

run().catch((err) => {
    console.log(err);
    process.exit(1);
});
