import Clan from "../models/clanModel.js";
import User from "../models/userModel.js";
import { io } from "../server.js";

export const createClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { avatar, banner, name, description, domain, tags, visibility } =
            req.body;

        const newClan = await Clan.create({
            avatar,
            banner,
            name: name.trim(),
            description: description.trim(),
            domain,
            tags,
            owner: userId,
            members: [userId],
            visibility: visibility.toLowerCase(),
        });

        io.to(userId).emit("clan_created", newClan);

        res.status(201).json({ msg: "Clan created successfully", newClan });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const myClans = async (req, res) => {
    try {
        const userId = req.user._id;

        const clans = await Clan.find({
            $or: [{ members: userId }, { "joinRequests.user": userId }],
        })
            .populate("joinRequests.user", "username avatar")
            .populate("owner", "name username avatar");

        res.status(200).json(clans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getClanById = async (req, res) => {
    try {
        const { clanId } = req.params;
        const clan = await Clan.findById(clanId)
            .populate("joinRequests.user", "username avatar")
            .populate("owner", "name username avatar");
        res.status(200).json(clan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const joinClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId);

        if (!clan) {
            return res.status(404).json({ error: "Clan not found" });
        }

        if (clan.members.length >= clan.maxMembers)
            return res.status(400).json({ error: "Clan is full" });

        if (clan.members.some((member) => member.equals(userId))) {
            return res.status(400).json({ msg: "Already a member" });
        }

        if (clan.visibility === "public") {
            clan.members.addToSet(userId);
            await clan.save();
            io.emit("updated_clan", clan);
            return res
                .status(201)
                .json({ msg: `You have joined ${clan.name}`, clan: clan._id });
        }

        if (clan.visibility === "private") {
            const existingRequest = clan.joinRequests.find(
                (request) => request.user.toString() === userId.toString()
            );

            if (existingRequest) {
                return res.status(200).json({ msg: existingRequest.status });
            }

            clan.joinRequests.push({
                user: userId,
                status: "Pending",
            });

            await clan.save();
            io.emit("updated_clan", clan);
            return res.status(201).json({ msg: `Request sent`, clan });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const approveRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("owner", "name username avatar")
            .populate("joinRequests.user", "username avatar");

        if (!clan) return res.status(404).json({ error: "Not found" });

        if (!(clan.owner.equals(userId) || clan.moderators.includes(userId)))
            return res.status(403).json({ error: "Unauthorized" });

        if (clan.members.length >= clan.maxMembers)
            return res.status(400).json({ error: "Clan is full" });

        clan.joinRequests.pull({ user: memberId });
        clan.members.addToSet(memberId);
        await clan.save();

        io.emit("clan_update", clan);

        return res.status(202).json({ msg: "User successfully added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("owner", "username avatar name")
            .populate("joinRequests.user", "username avatar");

        if (!clan) return res.status(404).json({ error: "Not found" });

        if (!(clan.owner.equals(userId) || clan.moderators.includes(userId)))
            return res.status(403).json({ error: "Unauthorized" });

        clan.joinRequests.pull({ user: memberId });

        await clan.save();

        io.emit("updated_clan", clan);
        return res.status(202).json({ msg: "Request removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const removeMember = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;

        const clan = await Clan.findById(clanId)
            .populate("owner", "username avatar name")
            .populate("joinRequests.user", "username avatar name");

        if (!clan) return res.status(404).json({ error: "Not found" });

        if (!(clan.owner.equals(userId) || clan.moderators.includes(userId)))
            return res.status(403).json({ error: "Unauthorized" });

        clan.members.pull(memberId);

        await clan.save();

        io.emit("updated_clan", clan);
        res.status(202).json({ msg: "User successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addModerator = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;
        const clan = await Clan.findById(clanId)
            .populate("owner", "username avatar")
            .populate("joinRequests.user", "username avatar");

        const targetUser = await User.findById(memberId);

        if (!clan) {
            return res.status(404).json({ error: "Not found" });
        }

        if (!clan.owner.equals(userId)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (!clan.members.includes(memberId)) {
            return res
                .status(400)
                .json({ msg: "Only clan members can be added as moderators" });
        }

        if (clan.moderators.includes(memberId))
            return res
                .status(400)
                .json({ msg: `${targetUser.name} is already a moderator` });

        clan.moderators.addToSet(memberId);

        await clan.save();

        io.emit("updated_clan", clan);
        return res
            .status(202)
            .json({ msg: `New moderator added ${targetUser.name}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeModerator = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;
        const clan = await Clan.findById(clanId)
            .populate("owner", "username avatar")
            .populate("joinRequests.user", "username avatar");

        const targetUser = await User.findById(memberId);
        if (!clan) {
            return res.status(404).json({ error: "Clan not found" });
        }

        if (!clan.owner.equals(userId)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (!clan.moderators.includes(memberId))
            return res
                .status(400)
                .json({ msg: `${targetUser.name} is not a moderator` });

        clan.moderators.pull(memberId);

        await clan.save();

        io.emit("updated_clan", clan);
        return res
            .status(202)
            .json({ msg: `${targetUser.name} removed as a moderator` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const leaveClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;
        const clan = await Clan.findById(clanId);

        if (!clan) {
            return res.status(404).json({ error: "Not found" });
        }

        if (clan.creator.toString() === userId.toString()) {
            return res.status(400).json({
                error: "Creator cannot leave the clan",
            });
        }

        clan.members.pull(userId);
        clan.moderators.pull(userId);

        await clan.save();
        res.status(202).json({
            msg: `You have successfully left ${clan.name}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId);

        if (!clan) return res.status(404).json({ error: "Not found" });

        if (
            !(
                clan.creator.toString() === userId.toString() ||
                clan.moderators.includes(userId)
            )
        )
            return res.status(403).json({ error: "Unauthorized" });

        await Clan.findByIdAndDelete(clanId);
        res.status(202).json({ msg: "Clan deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
