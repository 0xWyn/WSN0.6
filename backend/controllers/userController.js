import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        const isFollowing = user.followers.some(
            (id) => id.toString() === req.user.id
        );
        const result = { ...user.toObject(), isFollowing };
        res.status(200).json(result);
    } catch (error) {
        // console.error(error);
        res.status(500).json(error);
    }
};

export const getPostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ author: userId }).populate("author");
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
