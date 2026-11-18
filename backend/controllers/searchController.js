import Clan from "../models/clanModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import { cleanQuery } from "../helpers/cleanQuery.js";

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

export const searchDB = async (req, res) => {
    try {
        const { q } = req.query;
        const query = cleanQuery(q);

        if (!query || !query.trim() || query.length < 2)
            return res.status(400).json({ error: "Invalid query." });

        if (query.length > 100)
            return res.status(400).json({ error: "Query too long" });

        const words = [...new Set(query.split(/\s+/))];

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
                { bio: { $regex: query, $options: "i" } },
            ],
        }).limit(10);

        const posts = await Post.aggregate([
            // 1. Find posts containing at least one search term
            {
                $match: {
                    $or: words.map((word) => ({
                        text: {
                            $regex: word,
                            $options: "i",
                        },
                    })),
                },
            },

            // 2. Calculate relevance
            {
                $addFields: {
                    // Count how many search terms appear
                    matchedTerms: {
                        $size: {
                            $filter: {
                                input: words,
                                as: "term",
                                cond: {
                                    $regexMatch: {
                                        input: {
                                            $ifNull: ["$text", ""],
                                        },
                                        regex: "$$term",
                                        options: "i",
                                    },
                                },
                            },
                        },
                    },

                    // Check whether the exact phrase appears
                    exactMatch: {
                        $regexMatch: {
                            input: {
                                $ifNull: ["$text", ""],
                            },
                            regex: query,
                            options: "i",
                        },
                    },
                },
            },

            // 3. Sort by relevance, then recency
            {
                $sort: {
                    exactMatch: -1,
                    matchedTerms: -1,
                    createdAt: -1,
                },
            },

            // 4. Limit results
            {
                $limit: 10,
            },

            // 5. Remove internal ranking fields
            {
                $project: {
                    matchedTerms: 0,
                    exactMatch: 0,
                },
            },
        ]);

        await Post.populate(posts, {
            path: "author",
            select: "name username avatar",
        });

        const clans = await Clan.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } },
            ],
        }).limit(10);

        const comments = await Comment.find({
            $or: [
                { text: { $regex: query, $options: "i" } },
                {
                    $or: words.map((word) => ({
                        text: { $regex: word, $options: "i" },
                    })),
                },
            ],
        }).populate("author", "name username avatar");

        const results = { clans, posts, users, comments };

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};
