import express from "express";
import { fetchComments } from "../controllers/commentController.js";
import {
    createPost,
    deletePost,
    getClanPosts,
    getGlobalPosts,
    getPostById,
    toggleLike,
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getGlobalPosts);
router.get("/clan/:clanId", getClanPosts);
router.post("/", protect, createPost);
router.delete("/:postId", protect, deletePost);
router.patch("/:postId/like", protect, toggleLike);
router.get("/:postId", protect, getPostById);
router.get("/:postId/comments", protect, fetchComments);
export default router;
