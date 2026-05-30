import express from "express";
import {
    createAccount,
    identifyMe,
    login,
    logout,
    refreshToken,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", createAccount);
router.post("/login", login);
router.get("/idme", protect, identifyMe);
router.post("/refresh", refreshToken);
router.post("/logout", protect, logout);

export default router;
