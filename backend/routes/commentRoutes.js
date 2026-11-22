import express from "express";
import {
    createComment,
    deleteComment,
    fetchReplies,
    toggleCommentLike,
} from "../controllers/commentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/:commentId/replies", protect, fetchReplies);
router.patch("/:commentId/like", protect, toggleCommentLike);
router.delete("/:commentId", protect, deleteComment);

export default router;
