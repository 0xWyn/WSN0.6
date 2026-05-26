import express from "express";
import { protect } from "../middleware/auth";
import { getNotifications } from "../controllers/notificationController";

const router = express.Router();

router.get("/", protect, getNotifications);

export default router;
