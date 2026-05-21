import express from "express";
import {
    getPostsByUserId,
    getUserById,
    getUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", protect, getUserById);
router.get("/:userId/posts", getPostsByUserId);

export default router;
