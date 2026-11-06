import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { io } from "../server.js";
import { deleteCloudinaryAsset } from "../utils/deleteCloudinaryAsset.js";
import Follow from "../models/followModel.js";

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
        const { targetId } = req.params;
        const { _id: userId } = req.user;

        const targetUser = await User.findById(targetId);

        if (!targetUser)
            return res.status(404).json({ error: "User not found" });

        const isFollowing = Boolean(
            await Follow.findOne({
                user: targetId,
                follower: userId,
            })
        );

        res.status(200).json({
            ...targetUser.toObject(),
            isFollowing,
            __isFull: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

export const getPostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ author: userId }).populate(
            "author",
            "username avatar"
        );
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

export const addFollow = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFollow = async (req, res) => {
    try {
    } catch (error) {}
};

export const editProfile = async (req, res) => {
    let newAvatarId;
    let newCoverId;
    try {
        const user = req.user;
        const { cover, avatar, name, username, bio } = req.body;

        const oldAvatarId = user.avatar?.publicId;
        const oldCoverId = user.cover?.publicId;

        newAvatarId =
            avatar?.publicId !== user?.avatar?.publicId
                ? avatar?.publicId
                : null;
        newCoverId =
            cover?.publicId !== user?.cover?.publicId ? cover?.publicId : null;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                avatar,
                cover,
                name,
                username,
                bio,
            },
            { returnDocument: true }
        );

        if (newAvatarId && oldAvatarId) {
            await deleteCloudinaryAsset(oldAvatarId);
        }
        if (newCoverId && oldCoverId) {
            await deleteCloudinaryAsset(oldCoverId);
        }

        io.emit("profile_update", updatedUser);

        res.status(200).json({
            msg: `Profile updated successfully`,
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error);

        try {
            if (newAvatarId) {
                await deleteCloudinaryAsset(newAvatarId);
                console.log("Deleted newAvatar");
            }

            if (newCoverId) {
                await deleteCloudinaryAsset(newCoverId);
                console.log("Deleted newUser");
            }
        } catch (cleanupError) {
            console.error(
                "Failed to clean up Cloudinary assets:",
                cleanupError
            );
        }
    }
};
