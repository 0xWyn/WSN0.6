import express from "express";
import {
    getNotifications,
    readNotifications,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/read", protect, readNotifications);

export default router;
