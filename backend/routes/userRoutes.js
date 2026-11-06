import express from "express";
import {
    addFollow,
    editProfile,
    getPostsByUserId,
    getUserById,
    getUsers,
    removeFollow,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:targetId", protect, getUserById);
router.get("/:userId/posts", getPostsByUserId);
router.put("/:targetId/follow", protect, addFollow);
router.delete("/:targetId/follow", protect, removeFollow);

router.patch("/profile", protect, editProfile);

export default router;
