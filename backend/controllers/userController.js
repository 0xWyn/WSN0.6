import mongoose from "mongoose";
import { followNotificationService } from "../helpers/notificationService.js";
import Follow from "../models/followModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { io } from "../server.js";
import { deleteCloudinaryAsset } from "../utils/deleteCloudinaryAsset.js";

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
        const { _id: userId, username, avatar } = req.user;
        const { targetId } = req.params;

        if (userId.toString() === targetId)
            return res
                .status(400)
                .json({ error: "You cannot follow yourself." });

        const targetUser = await User.findById(targetId);

        if (!targetUser)
            return res.status(404).json({ error: "User not found" });

        const filter = {
            user: targetId,
            follower: userId,
        };

        const session = await mongoose.connection.startSession();

        let alreadyFollowing = false;

        try {
            await session.withTransaction(async () => {
                const existingFollow =
                    await Follow.findOne(filter).session(session);

                if (existingFollow) {
                    alreadyFollowing = true;
                    return;
                }

                await Follow.create([filter], { session });

                await User.updateOne(
                    { _id: userId },
                    { $inc: { followingCount: 1 } },
                    { session }
                );

                await User.updateOne(
                    { _id: targetId },
                    { $inc: { followerCount: 1 } },
                    { session }
                );
            });
        } finally {
            await session.endSession();
        }

        if (alreadyFollowing) {
            return res
                .status(200)
                .json({ msg: "You already follow this user." });
        }

        console.log("Past this point");

        const notification = await followNotificationService(
            "follow",
            userId,
            targetId,
            {
                username,
                avatar: avatar?.url,
            }
        );

        const updatedTarget = await User.findById(targetId);
        const updatedAuth = await User.findById(userId);

        io.to(targetId).emit("notification", notification);

        io.to(`profile:${targetId}`).emit("updated_user", {
            _id: updatedTarget._id,
            followerCount: updatedTarget.followerCount,
        });

        io.to(`profile:${userId}`).emit("updated_user", {
            _id: updatedAuth._id,
            followingCount: updatedAuth.followingCount,
        });

        return res.status(201).json({
            msg: `You are now following @${targetUser.username}.`,
            userUpdate: { _id: targetUser._id, isFollowing: true },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFollow = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { targetId } = req.params;

        if (userId.toString() === targetId)
            return res.status(400).json({ error: "Invalid request." });

        const targetUser = await User.findById(targetId);

        if (!targetUser)
            return res.status(404).json({ error: "Users not found" });

        const filter = {
            user: targetId,
            follower: userId,
        };

        const session = await mongoose.startSession();

        let following = true;
        try {
            await session.withTransaction(async () => {
                const existingFollow =
                    await Follow.findOne(filter).session(session);

                if (!existingFollow) {
                    following = false;
                    return;
                }

                const deletedFollow = await Follow.findOneAndDelete(filter, {
                    session,
                });

                if (!deletedFollow) {
                    throw new Error("Could not remove follow.");
                }

                await User.updateOne(
                    { _id: userId },
                    { $inc: { followingCount: -1 } },
                    { session }
                );

                await User.updateOne(
                    { _id: targetId },
                    { $inc: { followerCount: -1 } },
                    { session }
                );
            });
        } catch (error) {
            console.error(error);
        } finally {
            await session.endSession();
        }

        if (!following)
            return res
                .status(400)
                .json({ error: "You are not following this user" });

        const updatedTarget = await User.findById(targetId);
        const updatedAuth = await User.findById(userId);

        io.to(`profile:${targetId}`).emit("updated_user", {
            _id: updatedTarget._id,
            followerCount: updatedTarget.followerCount,
        });
        io.to(`profile:${userId}`).emit("updated_user", {
            _id: updatedAuth._id,
            followingCount: updatedAuth.followingCount,
        });

        return res.status(201).json({
            msg: `You are no longer following @${targetUser.username}.`,
            userUpdate: { _id: targetUser._id, isFollowing: false },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

export const getUserFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const { _id: authId } = req.user;

        const targetUser = await User.findById(userId);

        if (!targetUser) {
            return res.status(404).json({ error: "Target user not found" });
        }

        if (targetUser.isPrivate) {
            if (
                !Boolean(
                    await Follow.findOne({ user: userId, follower: authId })
                )
            )
                return res
                    .status(403)
                    .json({ error: "This account is private" });
        }

        const followers = await Follow.find({ user: userId }).populate(
            "follower",
            "name username avatar bio"
        );

        return res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getUserFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const { _id: authId } = req.user;
        const targetUser = await User.findById(userId);

        if (!targetUser) {
            return res.status(404).json({ error: "Target user not found" });
        }

        if (targetUser.isPrivate) {
            if (
                !Boolean(
                    await Follow.findOne({ user: userId, follower: authId })
                )
            )
                return res
                    .status(403)
                    .json({ error: "This account is private" });
        }

        const following = await Follow.find({ follower: userId }).populate(
            "user",
            "name username avatar"
        );

        return res.status(200).json(following);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
