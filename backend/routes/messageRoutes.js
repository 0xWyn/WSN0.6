import express from "express";
import {
    createMessage,
    deleteMessage,
    editMessage,
    getMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createMessage);
router.get("/:messageId", getMessage);
router.delete("/:messageId", protect, deleteMessage);
router.patch("/:messageId", protect, editMessage);

export default router;
