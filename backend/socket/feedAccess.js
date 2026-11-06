import mongoose from "mongoose";
import Clan from "../models/clanModel.js";
import ClanMember from "../models/clanMemberModel.js";
import User from "../models/userModel.js";
import Follow from "../models/followModel.js";

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

    return false;
};
