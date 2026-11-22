import express from "express";
import { fetchComments } from "../controllers/commentController.js";
import {
    createPost,
    deletePost,
    deletePostLike,
    getClanPosts,
    getGlobalPosts,
    getPostById,
    likePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getGlobalPosts);
router.get("/clan/:clanId", protect, getClanPosts);
router.post("/", protect, createPost);
router.delete("/:postId", protect, deletePost);

router.put("/:postId/like", protect, likePost);
router.delete("/:postId/like", protect, deletePostLike);
router.get("/:postId", protect, getPostById);
router.get("/:postId/comments", protect, fetchComments);
export default router;
