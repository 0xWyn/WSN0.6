import express from "express";
import { protect } from "../middleware/auth.js";
import { explore } from "../controllers/exploreController.js";

const router = express.Router();

router.get("/", protect, explore);

export default router;
