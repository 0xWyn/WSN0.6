import express from "express";
import {
    acceptOwnershipTransferRequest,
    approveJoinRequest,
    cancelJoinRequest,
    createClan,
    createOwnershipTransferRequest,
    deleteClan,
    deleteOwnershipTransferRequest,
    demoteMember,
    editClan,
    getAuthClans,
    getClanById,
    getClanLeaders,
    getClanMembers,
    getJoinRequests,
    getOwnershipTransferRequest,
    joinClan,
    leaveClan,
    promoteMember,
    rejectRequest,
    removeMember,
} from "../controllers/clanController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// General
router.post("/", protect, createClan);
router.patch("/:clanId/edit", protect, editClan);

// Civilian
router.get("/", protect, getAuthClans);
router.get("/:clanId", protect, getClanById);
router.put("/:clanId", protect, joinClan);
router.delete("/:clanId/membership", protect, leaveClan);
router.delete("/:clanId/request", protect, cancelJoinRequest);

// Admin
router.get("/:clanId/members", protect, getClanMembers);
router.get("/:clanId/joinRequests", protect, getJoinRequests);

router.put("/request/:requestId", protect, approveJoinRequest);
router.delete("/:clanId/request/:requestId", protect, rejectRequest);

router.patch("/:clanId/members/:membershipId/promote", protect, promoteMember);
router.patch("/:clanId/members/:membershipId/demote", protect, demoteMember);

router.delete("/membership/:membershipId", protect, removeMember);

router.patch("/:clanId/delete", protect, deleteClan);
router.patch(
    "/:clanId/transfer/:targetId",
    protect,
    createOwnershipTransferRequest
);

router.get("/:clanId/leaders", protect, getClanLeaders);
router.get("/:clanId/transferRequest", protect, getOwnershipTransferRequest);

router.patch("/transfer/:reqId", protect, acceptOwnershipTransferRequest);
router.delete("/transfer/:reqId", protect, deleteOwnershipTransferRequest);

export default router;
