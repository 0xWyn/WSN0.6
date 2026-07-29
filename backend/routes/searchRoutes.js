import express from "express";
import {
    searchClanContent,
    searchClanDirectory,
    searchUserPosts,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/clans/:term", searchClanDirectory);
router.get("/clans/:clanId/:term", searchClanContent);
router.get("/user/:userId/:term", searchUserPosts);

export default router;
