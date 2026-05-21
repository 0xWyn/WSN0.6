import express from "express";
import { protect } from "../middleware/auth.js";
import {
    createComment,
    fetchReplies,
    toggleCommentLike,
} from "../controllers/commentController.js";
import { toggleLike } from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/:commentId/replies", protect, fetchReplies);
router.patch("/:commentId/like", protect, toggleCommentLike);

export default router;
