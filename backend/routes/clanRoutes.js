import express from "express";
import {
    approveRequest,
    cancelMyRequest,
    createClan,
    deleteClan,
    demoteMember,
    getClanById,
    getClanMembers,
    getJoinRequests,
    joinClan,
    leaveClan,
    myClans,
    myRequestedClans,
    promoteMember,
    rejectRequest,
    removeMember,
} from "../controllers/clanController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// General
router.post("/", protect, createClan);

// Civilian
router.get("/", protect, myClans);
router.get("/requested", protect, myRequestedClans);
router.get("/:clanId", protect, getClanById);
router.put("/:clanId", protect, joinClan);
router.delete("/:clanId/membership", protect, leaveClan);
router.delete("/:clanId/request", protect, cancelMyRequest);

// Admin
router.get("/:clanId/members", protect, getClanMembers);
router.get("/:clanId/joinRequests", protect, getJoinRequests);

router.put("/:clanId/request/:requestId", protect, approveRequest);
router.delete("/:clanId/request/:requestId", protect, rejectRequest);

router.patch("/:clanId/members/:membershipId/promote", protect, promoteMember);
router.patch("/:clanId/members/:membershipId/demote", protect, demoteMember);

router.delete("/:clanId/members/:membershipId", protect, removeMember);

router.delete("/:clanId", protect, deleteClan);

export default router;
