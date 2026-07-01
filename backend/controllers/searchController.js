import Clan from "../models/clanModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

export const searchClanDirectory = async (req, res) => {
    try {
        const { term } = req.params;
        const clans = await Clan.find(
            {
                $text: { $search: term },
            },
            { name: 1 }
        );
        res.status(200).json(clans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchClanContent = async (req, res) => {
    try {
        const { clanId, term } = req.params;
        const clan = await Clan.findById(clanId).select("members");
        const users = await User.find({
            _id: { $in: clan.members },
            $or: [
                { username: { $regex: term, $options: "i" } },
                { name: { $regex: term, $options: "i" } },
            ],
        }).select("_id username name");
        const memberIds = users.map((user) => user._id);
        const USER_PREVIEW = "username";
        const [posts, comments, memberPosts, memberComments] =
            await Promise.all([
                Post.find({
                    clan: clanId,
                    $text: { $search: term },
                })
                    .select("author text")
                    .populate("author", USER_PREVIEW),

                Comment.find({
                    clan: clanId,
                    $text: { $search: term },
                })
                    .select("author text")
                    .populate("author", USER_PREVIEW),

                Post.find({
                    clan: clanId,
                    author: { $in: memberIds },
                })
                    .select("author text")
                    .populate("author", USER_PREVIEW),

                Comment.find({
                    clan: clanId,
                    author: { $in: memberIds },
                })
                    .select("author text")
                    .populate("author", USER_PREVIEW),
            ]);
        res.status(200).json({
            users,
            posts,
            memberPosts,
            comments,
            memberComments,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchUserPosts = async (req, res) => {
    try {
        const { userId, term } = req.params;
        const posts = await Post.find(
            {
                author: userId,
                $text: { $search: term },
            },
            {
                score: { $meta: "textScore" },
            }
        ).sort({ score: { $meta: "textScore" } });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
