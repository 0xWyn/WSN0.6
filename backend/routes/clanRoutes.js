import express from "express";
import { protect } from "../middleware/auth.js";
import {
    addModerator,
    approveRequest,
    createClan,
    deleteClan,
    getClanById,
    joinClan,
    leaveClan,
    myClans,
    rejectRequest,
    removeMember,
    removeModerator,
} from "../controllers/clanController.js";

const router = express.Router();

// Admin
router.post("/", protect, createClan);
router.patch("/:clanId/approve/:memberId", protect, approveRequest);
router.patch("/:clanId/reject/:memberId", protect, rejectRequest);
router.delete("/:clanId/remove/:memberId", protect, removeMember);
router.put("/:clanId/moderators/:memberId", protect, addModerator);
router.delete("/:clanId/moderators/:memberId", protect, removeModerator);
router.delete("/:clanId", protect, deleteClan);

// Civilian
router.get("/", protect, myClans);
router.get("/:clanId", protect, getClanById);
router.put("/:clanId", protect, joinClan);
router.patch("/:clanId/leave", protect, leaveClan);

export default router;
