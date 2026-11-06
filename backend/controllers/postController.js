import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import { io } from "../server.js";
import Like from "../models/likeModel.js";
import { postNotificationService } from "../helpers/notificationService.js";

export const getGlobalPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await Post.find({})
            .populate("author", "username avatar")
            .lean();
        const updated = await Promise.all(
            posts.map((post) => {
                const isLiked = Like.findOne({
                    user: userId,
                    entity: post._id,
                    entityModel: "Post",
                });

                return { ...post, isLiked };
            })
        );
        const sorted = updated.sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json(sorted);
    } catch (error) {
        console.error(error.response);
    }
};

export const getClanPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;
        const posts = await Post.find({ clan: clanId })
            .populate("author", "username avatar")
            .populate("clan", "name")
            .sort({ createdAt: -1 })
            .lean();

        const hydrated = await Promise.all(
            posts.map(async (post) => {
                const isLiked = await Like.findOne({
                    user: userId,
                    entity: post._id,
                    entityModel: "Post",
                });

                return { ...post, isLiked: !!isLiked };
            })
        );
        res.status(200).json(hydrated);
    } catch (error) {
        console.error(error.response);
    }
};

export const createPost = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(403).json({ error: "req.user failed" });
        const { text, media, clan } = req.body;
        const newPost = await Post.create({
            author: user._id,
            text,
            media,
            clan,
        });

        const post = await Post.findById(newPost._id).populate(
            "author",
            "username avatar"
        );

        io.emit("new_post", post);
        res.status(201).json({ msg: "Post created successfully" });
    } catch (error) {
        console.error(error.response);
    }
};

export const toggleLike = async (req, res) => {
    try {
        const userId = req.user._id;
        const { postId } = req.params;

        const post = await Post.findById(postId).populate(
            "author",
            "username name avatar"
        );

        if (!post) return res.status(404).json({ msg: "Post not found" });

        const filter = {
            user: userId,
            entity: postId,
            entityModel: "Post",
        };

        const existingLike = await Like.findOne(filter);

        let isLiked;

        if (existingLike) {
            const deletedLike = await Like.findOneAndDelete(filter);

            if (!deletedLike)
                return res.status(400).json({ msg: "Please try again" });
            isLiked = false;
        } else {
            try {
                await Like.create(filter);
                isLiked = true;
            } catch (error) {
                if (error.code === 11000) {
                    return res.status(409).json({
                        msg: "Like already exists",
                    });
                }

                throw error;
            }
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $inc: { likeCount: existingLike ? -1 : 1 },
            },
            { returnDocument: "after" }
        );

        io.to(`feed:clan:${post.clan.toString()}`)
            .to(`feed:user:${post.author._id.toString()}`)
            .emit("updated_post", {
                _id: postId,
                likeCount: updatedPost.likeCount,
            });

        if (!userId.equals(post.author._id)) {
            const notification = await postNotificationService(
                "post_like",
                postId,
                post.author._id,
                { username: req.user.username, avatar: req.user?.avatar?.url }
            );
            io.to(post.author._id.toString()).emit(
                "notification",
                notification
            );
        }

        return res.status(200).json({
            msg: isLiked ? "Like added" : "Like removed",
            post: {
                _id: postId,
                likeCount: updatedPost.likeCount,
                isLiked,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { postId } = req.params;
        const post = await Post.findById(postId)
            .populate("author", "username avatar")
            .lean();
        if (!post) return res.status(404).json({ msg: "Post not found" });

        const isLiked = await Like.findOne({
            user: userId,
            entity: postId,
            entityModel: "Post",
        });
        res.status(200).json({ ...post, isLiked: !!isLiked });
        return;
    } catch (error) {
        console.error(error);
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                msg: "Post not found",
            });
        }

        console.log(post.author.equals(userId));

        if (!post.author.equals(userId)) {
            return res.status(403).json({
                msg: "Unauthorized",
            });
        }

        await Comment.deleteMany({
            parentPost: post._id,
        });

        io.emit("deleted_post", post);

        await post.deleteOne();

        res.status(200).json({
            msg: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
