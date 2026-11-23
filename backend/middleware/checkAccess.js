import BlockBan from "../models/blockBanModel.js";
import ClanMember from "../models/clanMemberModel.js";
import Clan from "../models/clanModel.js";
import Post from "../models/postModel.js";

export const checkAccess = async (req, res, next) => {
    const { _id: userId } = req.user;

    const { parentPost } = req.body;
    try {
        const post = await Post.findById(parentPost).select("author clan");

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post.author.equals(userId)) {
            return next();
        }

        const isBlocked = await BlockBan.exists({
            entity: post.author,
            entityType: "User",
            user: userId,
        });

        const isBanned = await BlockBan.exists({
            entity: post.clan,
            entityType: "Clan",
            user: userId,
        });

        const clan = await Clan.findById(post.clan).select(isPrivate);

        const privacyBlock = clan.isPrivate
            ? await ClanMember.exists({
                  clan: post.clan,
                  user: userId,
                  status: "active" || "flagged",
              })
            : false;

        if (isBlocked || isBanned || privacyBlock)
            return res
                .status(403)
                .json({ error: "You may not interact with this post." });

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.response });
    }
};
