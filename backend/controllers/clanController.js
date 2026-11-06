import Clan from "../models/clanModel.js";
import User from "../models/userModel.js";
import ClanMember from "../models/clanMemberModel.js";
import ClanJoinRequest from "../models/clanJoinRequestModel.js";
import { io } from "../server.js";
import { clanNotificationService } from "../helpers/notificationService.js";
import updatePostMeta from "../scripts/updatePostMeta.js";
import { deleteCloudinaryAsset } from "../utils/deleteCloudinaryAsset.js";
import ClanOwnershipTransfer from "../models/clanOwnershipTransferModel.js";
import { request } from "http";

// General

export const getClanById = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId).populate(
            "founder",
            "name username avatar"
        );

        const membership = await ClanMember.findOne({
            user: userId,
            clan: clanId,
        });

        const result = { ...clan.toObject(), role: membership?.role ?? null };
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Actions

export const createClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { avatar, banner, name, description, domain, tags, access } =
            req.body;

        const newClan = await Clan.create({
            avatar,
            banner,
            name: name.trim(),
            description: description.trim(),
            domain,
            tags,
            founder: userId,
            access: access.toLowerCase(),
        });

        const newMembership = await ClanMember.create({
            clan: newClan._id,
            user: userId,
            role: "founder",
        });

        const result = { ...newClan.toObject(), role: "founder" };

        io.to(userId).emit("new_clan", result);

        res.status(201).json({ msg: "Clan created successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAuthClans = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const clans = [];

        const memberships = await ClanMember.find({ user: userId });

        const joinRequests = await ClanJoinRequest.find({ user: userId });

        for (const { clan, role } of memberships) {
            const result = await Clan.findById(clan)
                .populate("founder", "name username avatar")
                .lean();
            clans.push({ ...result, role: role });
        }

        for (const { clan } of joinRequests) {
            const result = await Clan.findById(clan)
                .populate("founder", "name user avatar")
                .lean();
            clans.push({ ...result, requested: true });
        }

        res.status(200).json(clans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const joinClan = async (req, res) => {
    try {
        const { clanId } = req.params;
        const reqUser = req.user;

        const clan = await Clan.findById(clanId)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan) return res.status(404).json({ msg: `Clan not found.` });

        const isPrivate = clan.access === "private";

        const existingMembership = await ClanMember.findOne({
            clan: clanId,
            user: reqUser._id,
        });

        if (existingMembership) {
            console.log(existingMembership);
            return res
                .status(200)
                .json({ msg: `You are already a member of this clan.` });
        }

        if (isPrivate) {
            const newJoinRequest = await ClanJoinRequest.create({
                user: reqUser._id,
                clan: clanId,
            });

            const joinRequestNotification = await clanNotificationService(
                "join_request",
                clanId,
                clan.founder,
                {
                    name: clan.name,
                    avatar: clan.avatar.url,
                    username: reqUser.username,
                }
            );

            io.to(clan.founder.toString()).emit(
                "notification",
                joinRequestNotification
            );

            const clanUpdate = { ...clan, role: null, requested: true };
            io.to(reqUser._id.toString()).emit("updated_clan", clanUpdate);
            return res
                .status(201)
                .json({ msg: `You have requested to join ${clan.name}` });
        } else {
            const newMembership = await ClanMember.create({
                user: reqUser._id,
                clan: clanId,
            });

            const newMemberNotification = await clanNotificationService(
                "new_clan_member",
                clanId,
                clan.founder,
                {
                    name: clan.name,
                    avatar: clan.avatar,
                    username: clan.reqUser.username,
                }
            );
            io.to(clan.founder.toString()).emit(
                "notification",
                newMemberNotification
            );

            const clanUpdate = { ...clan, role: "member" };
            io.to(reqUser._id.toString()).emit("updated_clan", clanUpdate);

            return res
                .status(201)
                .json({ msg: `You have joined ${clan.name}` });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: error.message });
    }
};

export const leaveClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;
        const clan = await Clan.findById(clanId)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan) {
            return res.status(404).json({ error: "Not found" });
        }

        const clanMember = await ClanMember.findOne({
            user: userId,
            clan: clanId,
        });

        if (!clanMember) {
            return res
                .status(404)
                .json({ msg: "You are not a member of this clan" });
        }

        await clanMember.deleteOne();

        io.to(clanId).emit("exited_member", clanMember);

        io.to(userId.toString()).emit("exited_clan", { ...clan, role: null });

        res.status(202).json({
            msg: `You have successfully left ${clan.name}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const cancelJoinRequest = async (req, res) => {
    try {
        const { clanId } = req.params;
        const userId = req.user._id;

        const clan = await Clan.findById(clanId)
            .populate("founder", "username name avatar")
            .lean();

        if (!clan) {
            return res.status(404).json({ msg: "Clan not found" });
        }

        const joinRequest = await ClanJoinRequest.findOne({
            clan: clanId,
            user: userId,
        });

        if (!joinRequest) {
            return res.status(400).json({ msg: "Request not found" });
        }

        await joinRequest.deleteOne();

        const clanUpdate = { ...clan, requested: false };

        io.to(userId.toString()).emit("updated_clan", clanUpdate);
        io.to(clanId).emit("deleted_request", joinRequest);
        return res.status(201).json({ msg: "Request successfully removed" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};

export const editClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const body = req.body;

        const clan = await Clan.findById(clanId).populate(
            "founder",
            "name username avatar"
        );

        if (!clan) return res.status(404).json({ msg: "Clan not found" });

        if (!clan.founder._id.equals(userId))
            return res.status(403).json({ msg: "Unauthorized access denied." });

        const { avatar, banner } = clan;

        const oldBannerId = banner?.publicId;
        const oldAvatarId = avatar?.publicId;

        Object.entries(body).forEach(([key, value]) => {
            clan[key] = value;
        });

        if (oldBannerId && body.banner?.publicId) {
            await deleteCloudinaryAsset(oldBannerId);
        }

        if (oldAvatarId && body.avatar?.publicId) {
            await deleteCloudinaryAsset(oldAvatarId);
        }

        await clan.save();

        io.to(clanId).emit("updated_clan", clan);
        return res.status(200).json({ msg: "Clan successfully edited" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const createOwnershipTransferRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, targetId } = req.params;

        const clan = await Clan.findById(clanId);

        const targetMember = await ClanMember.findOne({
            clan: clanId,
            user: targetId,
            role: "leader",
        });

        if (!clan) return res.status(404).json({ msg: "Clan not foundd" });

        if (!clan.founder.equals(userId))
            return res.status(403).json({ msg: "Unauthorized access denied" });

        if (!targetMember) {
            return res.status(400).json({ msg: "Invalid successor selection" });
        }

        const existingTransferRequest = await ClanOwnershipTransfer.findOne({
            clan: clanId,
        });

        if (existingTransferRequest) {
            await existingTransferRequest.deleteOne();
        }

        await ClanOwnershipTransfer.create({
            clan: clanId,
            targetUser: targetId,
        });

        const notification = await clanNotificationService(
            "clan_ownership_transfer_request",
            clanId,
            targetId,
            {
                name: clan.name,
                avatar: clan.avatar.url,
            }
        );

        io.to(targetId).emit("clan_ownership_transfer_request", notification);

        return res
            .status(201)
            .json({ msg: "Transfer request created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getOwnershipTransferRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId);

        if (!clan) return res.status(404).json({ msg: "Clan not found." });

        const existingRequest = await ClanOwnershipTransfer.findOne({
            clan: clanId,
        }).populate([
            { path: "targetUser", select: "name username avatar" },
            { path: "clan", select: "name avatar founder" },
        ]);

        if (!existingRequest) {
            return res
                .status(204)
                .json({ msg: "No existing clan request found." });
        }

        if (
            !clan.founder.equals(userId) &&
            !existingRequest.targetUser._id.equals(userId)
        )
            return res.status(403).json({ msg: "Unauthorized access denied" });

        return res.status(200).json(existingRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const deleteOwnershipTransferRequest = async (req, res) => {
    try {
        const { reqId } = req.params;
        const userId = req.user._id;

        const transferRequest = await ClanOwnershipTransfer.findById(
            reqId
        ).populate("clan", "founder");

        if (!transferRequest)
            return res.status(404).json({ msg: "Transfer request not found." });

        if (
            !transferRequest.clan.founder.equals(userId) &&
            !transferRequest.equals(userId)
        )
            return res.status(403).json({ msg: "Unauthorized access denied." });

        await ClanOwnershipTransfer.deleteOne();

        return res
            .status(200)
            .json({ msg: "Pending clan request successfully deleted." });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: error.response });
    }
};

export const acceptOwnershipTransferRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { reqId } = req.params;
        const transferRequest = await ClanOwnershipTransfer.findById(
            reqId
        ).populate("clan", "founder");

        if (!transferRequest)
            return res
                .status(404)
                .json({ msg: "Clan ownership transfer not found." });

        if (!transferRequest.targetUser.equals(userId))
            return res.status(403).json({ msg: "Unauthorized access denied" });

        const clan = await Clan.findById(transferRequest.clan);

        if (!clan) return res.status(404).json({ msg: "Clan not found." });

        const newFounder = await ClanMember.findOne({
            user: userId,
            clan: clan._id,
        });
        const oldFounder = await ClanMember.findOne({
            user: clan.founder,
            clan: clan._id,
        });

        newFounder.role = "founder";
        oldFounder.role = "member";

        clan.founder = userId;

        await clan.save();
        await newFounder.save();
        await oldFounder.save();

        await transferRequest.deleteOne();

        const newFounderNotification = await clanNotificationService(
            "clan_promotion",
            clan._id,
            newFounder.user,
            { name: clan.name, avatar: clan.avatar.url, rank: "Founder" }
        );
        const oldFounderNotification = await clanNotificationService(
            "clan_demotion",
            clan._id,
            oldFounder.user,
            { name: clan.name, avatar: clan.avatar.url, rank: "Member" }
        );

        io.to(newFounder.user.toString()).emit(
            "notification",
            newFounderNotification
        );
        io.to(oldFounder.user.toString()).emit(
            "notification",
            oldFounderNotification
        );

        io.to(clan._id.toString()).emit("updated_clan", clan);
        io.to(newFounder.user.toString()).emit("updated_clan", {
            ...clan,
            role: "founder",
        });
        io.to(oldFounder.user.toString()).emit("updated_clan", {
            ...clan,
            role: "member",
        });

        return res
            .status(202)
            .json({ msg: "Clan ownership transfer successful." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
// Clan Management

export const approveJoinRequest = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { requestId } = req.params;

        const joinRequest = await ClanJoinRequest.findById(requestId);

        if (!joinRequest)
            return res.status(404).json({ msg: "Join request not found." });

        const clan = await Clan.findById(joinRequest.clan)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan)
            return res.status(404).json({ msg: "Clan could not be found." });

        const authMembership = await ClanMember.findOne({
            clan: clan._id,
            user: userId,
        });

        if (
            !authMembership ||
            !["founder", "leader"].includes(authMembership.role)
        ) {
            return res.status(403).json({ msg: "Unauthorized access denied." });
        }

        const newMembership = await ClanMember.create({
            user: joinRequest.user,
            clan: clan._id,
            role: "member",
        });

        await joinRequest.deleteOne();

        await newMembership.populate("user", "name username avatar");

        io.to(clan._id.toString()).emit("deleted_request", joinRequest);

        io.to(clan._id.toString()).emit("new_member", newMembership);

        const clanUpdate = { ...clan, role: "member" };
        io.to(joinRequest.user.toString()).emit("updated_clan", clanUpdate);

        const membershipApprovalNotification = await clanNotificationService(
            "clan_membership_approval",
            clan._id,
            joinRequest.user,
            { name: clan.name, avatar: clan.avatar.url }
        );

        const newMemberNotification = await clanNotificationService(
            "new_clan_member",
            clan._id,
            clan.founder._id,
            {
                name: clan.name,
                avatar: clan.avatar.url,
                userName: newMembership.user.username,
            }
        );

        io.to(joinRequest.user.toString()).emit(
            "notification",
            membershipApprovalNotification
        );

        io.to(clan.founder._id.toString()).emit(
            "notification",
            newMemberNotification
        );

        return res
            .status(202)
            .json({ msg: "User request successfully approved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, requestId } = req.params;

        const clan = await Clan.findById(clanId).populate(
            "founder",
            "name username avatar"
        );
        if (!clan) return res.status(404).json({ error: "Clan not found" });

        const authMembership = await ClanMember.findOne({
            clan: clanId,
            user: userId,
        });

        if (
            !authMembership ||
            !["founder", "leader"].includes(authMembership.role)
        ) {
            return res.status(401).json({ msg: "Unauthorized access denied." });
        }

        const oldRequest = await ClanJoinRequest.findById(requestId);

        if (!oldRequest)
            return res.status(404).json({ msg: "Request not found" });

        if (!oldRequest.clan.equals(clan._id))
            return res
                .status(403)
                .json({ msg: "Unauthorized cross-clan action denied." });

        await oldRequest.deleteOne();

        io.to(clanId).emit("deleted_request", oldRequest);
        io.to(oldRequest.user).emit("updated_clan", clan);

        return res
            .status(202)
            .json({ msg: "User request declined successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getJoinRequests = async (req, res) => {
    try {
        const { clanId } = req.params;
        const userId = req.user._id;

        const clan = await Clan.findById(clanId);

        if (!clan) {
            return res.status(404).json({ msg: "Clan not found." });
        }

        const membership = await ClanMember.findOne({
            user: userId,
            clan: clanId,
        });

        if (!membership || !["founder", "leader"].includes(membership.role)) {
            return res
                .status(403)
                .json({ msg: "Unauthorized access to clan requests denied" });
        }

        const joinRequests = await ClanJoinRequest.find({
            clan: clanId,
        }).populate("user", "name username avatar");

        return res.status(200).json(joinRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};

export const getClanMembers = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Number(req.query.limit) || 20, 50);
        const skip = (page - 1) * limit;

        const clan = await Clan.findById(clanId).select("_id");
        if (!clan) {
            return res.status(404).json({ msg: "Clan not found" });
        }

        const membership = await ClanMember.findOne({
            user: userId,
            clan: clanId,
        }).select("role");

        const authorized =
            membership && ["founder", "leader"].includes(membership.role);

        if (!authorized) {
            return res.status(403).json({ msg: "Unauthorized access denied." });
        }

        const members = await ClanMember.find({ clan: clanId })
            .populate("user", "username name avatar")
            .sort({ joinedAt: 1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await ClanMember.countDocuments({
            clan: clanId,
        });

        return res
            .status(200)
            .json({ members, hasMore: skip + members.length < total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};

export const getClanLeaders = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId);

        if (!clan)
            return res.status(404).json({ msg: "Requested entity not found." });

        if (!clan.founder.equals(userId))
            return res.status(403).json({ msg: "Unauthorized access denied" });

        const leaders = await ClanMember.find({
            clan: clanId,
            role: "leader",
        }).populate("user", "name username avatar");

        return res.status(200).json(leaders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};

export const deleteClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;
        const clan = await Clan.findById(clanId).populate(
            "founder",
            "name username avatar"
        );

        if (!clan) return res.status(404).json({ msg: "Clan not found" });

        if (!clan.founder._id.equals(userId))
            return res.status(403).json({ msg: "Unauthorized access denied." });

        const members = await ClanMember.find({ clan: clanId });

        if (clan.deletionScheduledAt) {
            clan.deletionScheduledAt = null;
            clan.status = "active";

            await clan.save();

            io.to(clanId).emit("updated_clan", clan.toObject());

            await Promise.all([
                ...members.map(async ({ user }) => {
                    const notification = await clanNotificationService(
                        "clan_deletion_cancelled",
                        clan,
                        user,
                        {
                            name: clan.name,
                            avatar: clan.avatar.url,
                            deletionCancelledAt: clan.updatedAt,
                        }
                    );

                    io.to(user.toString()).emit("notification", notification);
                }),

                updatePostMeta(clanId),
            ]);

            return res
                .status(202)
                .json({ msg: `Clan deletion successfully aborted` });
        }

        if (!clan.deletionScheduledAt) {
            clan.deletionScheduledAt = new Date();
            clan.status = "deactivated";

            await clan.save();

            // Some script to actually delete the clan after 30 days.

            io.to(clanId).emit("updated_clan", clan.toObject());

            await Promise.all([
                ...members.map(async ({ user }) => {
                    const notification = await clanNotificationService(
                        "clan_deletion_scheduled",
                        clan,
                        user,
                        {
                            name: clan.name,
                            avatar: clan.avatar.url,
                        }
                    );

                    io.to(user.toString()).emit("notification", notification);
                }),
                updatePostMeta(clanId),
            ]);

            return res.status(202).json({
                msg: "Your clan has successfully been scheduled for deletion.",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const promoteMember = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, membershipId } = req.params;
        const clan = await Clan.findById(clanId)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan) {
            return res.status(404).json({ error: "Not found" });
        }

        if (!clan.founder._id.equals(userId)) {
            return res.status(403).json({ msg: "Unauthorized access denied." });
        }

        const membership = await ClanMember.findById(membershipId).populate(
            "user",
            "name username avatar"
        );

        if (!membership) {
            return res
                .status(404)
                .json({ msg: `Membership not found: ${membershipId}` });
        }
        if (!membership.clan.equals(clan._id)) {
            return res
                .status(404)
                .json({ msg: "Membership does not belong to clan" });
        }

        membership.role = "leader";

        const {
            user: { _id: memberId },
        } = membership;
        await membership.save();

        const clanUpdate = { ...clan, role: "leader" };
        io.to(memberId.toString()).emit("updated_clan", clanUpdate);

        const notification = await clanNotificationService(
            "clan_promotion",
            clan,
            memberId,
            { rank: "leader", name: clan.name, avatar: clan.avatar.url }
        );

        io.to(memberId.toString()).emit("notification", notification);

        return res.status(200).json({
            msg: `${membership.user.name} has been promoted to leader!`,
            membership,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const demoteMember = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, membershipId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("founder", "username name avatar")
            .lean();

        if (!clan) {
            return res.status(404).json({ msg: "Clan not found" });
        }

        if (!clan.founder._id.equals(userId)) {
            return res
                .status(403)
                .json({ msg: "Unauthorized access to clan denied" });
        }

        const membership = await ClanMember.findById(membershipId).populate(
            "user",
            "username name avatar"
        );

        if (!membership) {
            return res.status(404).json({ msg: `Membership not found.` });
        }

        if (!membership.clan.equals(clan._id)) {
            return res
                .status(404)
                .json({ msg: "Membership does not belong to clan" });
        }

        membership.role = "member";

        await membership.save();

        const memberId = membership.user._id.toString();
        const clanUpdate = { ...clan, role: "member" };
        const notification = await clanNotificationService(
            "clan_demotion",
            clan,
            memberId,
            { rank: "member", name: clan.name, avatar: clan.avatar.url }
        );

        io.to(memberId).emit("updated_clan", clanUpdate);
        io.to(memberId).emit("notification", notification);
        return res.status(200).json({
            msg: `${membership.user.name} has been demoted from leadership`,
            membership,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const removeMember = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { membershipId } = req.params;

        const membership = await ClanMember.findById(membershipId);

        if (!membership)
            return res.status(404).json({ msg: "Membership not found" });

        const clan = await Clan.findById(membership.clan)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan)
            return res.status(404).json({ msg: "Clan could not be found." });

        if (!clan.founder._id.equals(userId))
            return res.status(403).json({ msg: "Unauthorized access denied." });

        await membership.deleteOne();

        io.to(clan._id.toString()).emit("kicked_member", membership);

        io.to(membership.user.toString()).emit("updated_clan", {
            ...clan,
            role: null,
        });

        const notification = await clanNotificationService(
            "clan_kick",
            clan._id,
            membership.user,
            {
                name: clan.name,
                avatar: clan.avatar.url,
                violation: "C-0",
            }
        );

        io.to(membership.user.toString()).emit("notification", notification);

        res.status(200).json({
            msg: "User membership successfully revoked.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
