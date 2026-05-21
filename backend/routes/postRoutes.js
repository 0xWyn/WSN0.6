import express from "express";
import { protect } from "../middleware/auth.js";
import {
    createPost,
    getPostById,
    getPosts,
    toggleLike,
} from "../controllers/postController.js";
import { fetchComments } from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.patch("/:postId/like", protect, toggleLike);
router.get("/:postId", protect, getPostById);
router.get("/:postId/comments", protect, fetchComments);
export default router;
