import Clan from "../models/clanModel.js";
import User from "../models/userModel.js";
import ClanMember from "../models/clanMemberModel.js";
import ClanJoinRequest from "../models/clanJoinRequestModel.js";
import { io } from "../server.js";
import { clanNotificationService } from "../helpers/notificationService.js";
import updatePostMeta from "../scripts/updatePostMeta.js";

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

export const myClans = async (req, res) => {
    try {
        const userId = req.user._id;
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
            const clan = await Clan.findById(clan)
                .populate("founder", "name user avatar")
                .lean();
            clans.push({ ...clan, requested: true });
        }

        res.status(200).json(clans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const joinClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan) {
            return res.status(404).json({ error: "Clan not found" });
        }

        const clanMembers = await ClanMember.find({ clan: clanId });
        // if clan.locked (i.e., not accepting new members) return err;

        if (clanMembers.length >= clan.maxMembers) {
            console.log("Returning at line 114");
            return res.status(400).json({
                error: "This clan is at capacity. Create your own or find a new clan to lend your strength",
            });
        }

        if (clanMembers.some((member) => member.user.equals(userId))) {
            console.log("Returning at line 121");

            return res.status(400).json({ error: "Already a member" });
        }

        if (clan.access === "public") {
            const newMembership = await ClanMember.create({
                user: userId,
                clan: clanId,
                role: "member",
            });
            const clanUpdate = { ...clan, role: "member" };

            await newMembership.populate("user", "name username avatar");

            io.to(userId).emit("updated_clan", clanUpdate);
            io.to(clanId).emit("new_member", newMembership);

            return res
                .status(201)
                .json({ msg: `You have joined ${clan.name}` });
        }

        if (clan.access === "private") {
            const existingRequest = await ClanJoinRequest.findOne({
                user: userId,
                clan: clanId,
            });

            if (existingRequest) {
                return res.status(400).json({ msg: "Request already exists" });
            }
            const newRequest = await ClanJoinRequest.create({
                user: userId,
                clan: clanId,
            });

            const clanUpdate = { ...clan, requested: true };
            await newRequest.populate("user", "name username avatar");

            io.to(userId).emit("updated_clan", clanUpdate);
            io.to(clanId).emit("new_request", newRequest);

            return res.status(201).json({ msg: "Request sent successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
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

export const cancelMyRequest = async (req, res) => {
    try {
        const { clanId } = req.params;
        const userId = req.user._id;

        const clan = await Clan.findById(clanId).populate(
            "founder",
            "username name avatar"
        );

        if (!clan) {
            return res.status(404).json({ msg: "Clan not found" });
        }

        const joinRequest = ClanJoinRequest.findOne({
            clan: clanId,
            user: userId,
        });

        if (!joinRequest) {
            return res.status(400).json({ msg: "Request not found" });
        }

        await ClanJoinRequest.deleteOne(joinRequest);

        const clanUpdate = { ...clan.toObject(), requested: false };

        io.to(userId).emit("updated_clan", clanUpdate);
        io.to(clanId).emit("deleted_request", joinRequest);
        return res.status(201).json({ msg: "Request successfully removed" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};

// Clan Management

export const approveRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, requestId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("founder", "name username avatar")
            .lean();
        if (!clan) return res.status(404).json({ error: "Clan not found." });

        const authMembership = await ClanMember.findOne({
            user: userId,
            clan: clanId,
        });

        if (
            !authMembership ||
            !["founder", "leader"].includes(authMembership.role)
        ) {
            return res.status(403).json({ msg: "Unauthorized access denied." });
        }

        const request = await ClanJoinRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        const newMembership = await ClanMember.create({
            user: request.user,
            clan: clan._id,
            role: "member",
        });

        await request.deleteOne();

        await newMembership.populate("user", "name username avatar");

        io.to(clanId).emit("deleted_request", request);
        io.to(clanId).emit("new_member", newMembership);

        const clanUpdate = { ...clan, role: "member" };
        io.to(request.user.toString()).emit("approved_request", clanUpdate);

        const notification = await clanNotificationService(
            "clan_membership_approval",
            clan,
            request.user
        );

        io.to(request.user.toString()).emit("notification", notification);

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
                            clanName: clan.name,
                            clanAvatar: clan.avatar.url,
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
                        "clan_deletion",
                        clan,
                        user
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
            { rank: "leader" }
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
            { rank: "member" }
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
        const userId = req.user._id;
        const { clanId, membershipId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("founder", "name username avatar")
            .lean();

        if (!clan) return res.status(404).json({ error: "Clan not found" });

        if (!clan.founder._id.equals(userId)) {
            return res.status(403).json({
                msg: "Unauthorized access to clan information denied.",
            });
        }

        const membership = await ClanMember.findById(membershipId);
        if (!membership)
            return res.status(404).json({ msg: "Membership not found" });

        if (!membership.clan.equals(clan._id)) {
            return res
                .status(403)
                .json({ msg: "Unauthorized cross-clan action denied." });
        }

        await membership.deleteOne();

        io.to(clan._id).emit("kicked_member", membership);

        io.to(membership.user.toString()).emit("revoked_membership", clan);

        const notification = await clanNotificationService(
            "clan_kick",
            clan,
            membership.user
        );

        io.to(membership.user.toString()).emit("notification", notification);

        res.status(200).json({
            msg: "User membership successfully revoked.",
            membership,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
