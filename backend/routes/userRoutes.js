import express from "express";
import {
    editProfile,
    followUser,
    getPostsByUserId,
    getUserById,
    getUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", protect, getUserById);
router.get("/:userId/posts", getPostsByUserId);
router.patch("/:targetId/follow", protect, followUser);

router.patch("/profile", protect, editProfile);

export default router;
