import express from "express";
import {
    createChat,
    fetchChatById,
    fetchChats,
    useConversation,
} from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// To create a chat between req.user and another user (targetId)
router.post("/:targetId", protect, createChat);
// To get all chats
router.get("/", protect, fetchChats);
// To get a single chat by Id?
router.get("/:chatId", protect, fetchChatById);
router.get("/use/:chatId", useConversation);

export default router;
