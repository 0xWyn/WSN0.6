import mongoose from "mongoose";
import Clan from "../models/clanModel.js";
import ClanMember from "../models/clanMemberModel.js";
import User from "../models/userModel.js";
import Follow from "../models/followModel.js";
import Post from "../models/postModel.js";
import BlockBan from "../models/blockBanModel.js";

export const canAccessFeed = async (userId, type, id) => {
    if (type === "public") {
        return id === "main";
    }

    if (!mongoose.isValidObjectId(id)) {
        return false;
    }

    if (type === "clan") {
        const clan = await Clan.findById(id).select("visibility");

        if (!clan) return false;

        if (clan.visibility === "public") return true;

        return Boolean(
            await ClanMember.exists({
                clan: id,
                user: userId,
                status: "active",
            })
        );
    }

    if (type === "user") {
        const profile = await User.findById(id).select("isPrivate");

        if (!profile) return false;

        // I worry about this line
        if (userId.toString() === id.toString()) return true;

        if (!profile.isPrivate) return true;

        return Boolean(
            // Also check for blocks eventually
            await Follow.exists({
                user: id,
                follower: userId,
            })
        );
    }

    if (type === "post") {
        const post = await Post.findById(id).select("author");

        if (post.author.equals(userId)) return true;

        const author = await User.findById(post.author).select("isPrivate");

        const existingBlock = await BlockBan.findOne({
            entity: author._id,
            entityType: "User",
            user: userId,
        });

        if (author.isPrivate) {
            return Boolean(
                (await Follow.find({ user: author._id, follower: userId })) &&
                !existingBlock
            );
        }

        return Boolean(existingBlock);
    }

    return false;
};
