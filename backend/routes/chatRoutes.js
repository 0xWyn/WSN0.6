import express from "express";
import {
    createChat,
    fetchChatById,
    fetchChats,
    useConversation,
} from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/:targetId", protect, createChat);
router.get("/", protect, fetchChats);
router.get("/:chatId", protect, fetchChatById);
router.get("/use/:chatId", useConversation);

export default router;
