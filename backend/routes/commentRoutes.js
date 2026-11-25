import express from "express";
import {
    createComment,
    deleteComment,
    fetchReplies,
    likeComment,
    toggleCommentLike,
    unlikeComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

const router = express.Router();

router.post("/", protect, checkAccess, createComment);
router.get("/:commentId/replies", protect, fetchReplies);
router.put("/:commentId/like", protect, checkAccess, likeComment);
router.delete("/:commentId/like", protect, unlikeComment);

router.patch("/:commentId/like", protect, toggleCommentLike);
router.delete("/:commentId", protect, deleteComment);

export default router;
