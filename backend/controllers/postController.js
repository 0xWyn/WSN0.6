import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import { io } from "../server.js";

export const getGlobalPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("author", "username avatar");
        const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json(sorted);
    } catch (error) {
        console.error(error.response);
    }
};

export const getClanPosts = async (req, res) => {
    try {
        const { clanId } = req.params;
        const posts = await Post.find({ clan: clanId })
            .populate("author", "username avatar")
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
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
        io.emit("new_post", newPost);
        res.status(201).json({ msg: "Post created successfully" });
    } catch (error) {
        console.error(error.response);
    }
};

export const toggleLike = async (req, res) => {
    try {
        const userId = req.user._id;
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ msg: "Post not found" });
        const isLiked = post.likes.includes(userId);
        const update = isLiked
            ? { $pull: { likes: userId } }
            : { $addToSet: { likes: userId } };
        const updated = await Post.findByIdAndUpdate(postId, update, {
            returnDocument: "after",
        }).populate("author", "username avatar");
        io.emit("updated_post", updated);
        return res
            .status(200)
            .json({ msg: isLiked ? "Like removed" : "Like added", updated });
    } catch (error) {
        console.error(error);
    }
};

export const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate(
            "author",
            "username avatar"
        );
        if (!post) return res.status(404).json({ msg: "Post not found" });
        res.json(post);
        return;
    } catch (error) {
        // console.error(error);
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
