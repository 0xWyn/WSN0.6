import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { io } from "../server.js";

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

export const followUser = async (req, res) => {
    try {
        const { targetId } = req.params;
        const userId = req.user._id;
        if (targetId === userId.toString())
            return res
                .status(403)
                .json({ warning: "You can't follow yourself" });
        const targetUser = await User.findById(targetId);
        const clientUser = await User.findById(userId);
        const isFollowing = targetUser.followers.some(
            (id) => id.toString() === userId.toString()
        );
        console.log(isFollowing);
        if (isFollowing) {
            targetUser.followers = targetUser.followers.filter(
                (id) => id.toString() !== userId.toString()
            );

            clientUser.following = clientUser.following.filter(
                (id) => id.toString() !== targetId.toString()
            );
        } else {
            targetUser.followers.push(userId);
            clientUser.following.push(targetId);
        }

        await Promise.all([targetUser.save(), clientUser.save()]);

        const updatedUsers = await User.find({
            _id: { $in: [targetId, userId] },
        });
        io.emit(
            `${isFollowing ? "user_unfollow_update" : "user_follow_update"}`,
            updatedUsers
        );
        return res.status(203).json({
            msg: `You have ${isFollowing ? "unfollowed" : "followed"} @${targetUser.username}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
