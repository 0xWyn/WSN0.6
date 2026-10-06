import dotenv from "dotenv";
import Post from "../models/postModel.js";
import Clan from "../models/clanModel.js";

dotenv.config();

export default async function updatePostMeta(id) {
    try {
        const posts = Post.find({ clan: id })
            .populate("clan", "name status")
            .cursor();

        let count = 0;
        for await (const post of posts) {
            post.metadata = {
                ...post.metadata,
                clanSnapshot: {
                    ...post.metadata.clanSnapshot,
                    name: post.clan.name,
                    status: post.clan.status,
                },
            };

            await post.save();
            count++;
        }

        console.log(`Updated ${count} posts with new Clandata`);
    } catch (error) {
        console.error("Failed to update post metadata:", error);
        throw error;
    }
}
