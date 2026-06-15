import Clan from "../models/clanModel.js";
import User from "../models/userModel.js";

export const createClan = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanName, description, visibility, photo } = req.body;
        const newClan = await Clan.create({
            name: clanName,
            description,
            visibility,
            creator: userId,
            members: [userId],
        });
        res.status(201).json(newClan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const myClans = async (req, res) => {
    try {
        const userId = req.user._id;

        const clans = await Clan.find({ members: userId });

        res.status(200).json(clans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getClanById = async (req, res) => {
    try {
        const { clanId } = req.params;
        const clan = await Clan.findById(clanId);
        res.status(200).json(clan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const joinClan = async (req, res) => {
    try {
        const userId = req.user._id;
        // const user = await User.findById(userId);
        const { clanId } = req.params;

        const clan = await Clan.findById(clanId);

        if (clan.members.length >= clan.maxMembers)
            return res.status(400).json({ error: "Clan is full" });

        if (clan.visibility === "public") {
            clan.members.addToSet(userId);
            await clan.save();
            return res
                .status(201)
                .json({ msg: `You have joined ${clan.name}` });
        }

        if (clan.visibility === "request") {
            const existingRequest = clan.joinRequests.find(
                (req) => req.user === userId
            );

            if (existingRequest) {
                return res.status(400).json({ msg: alreadyRequested.status });
            }

            clan.joinRequests.push({
                user: userId,
                status: "Pending",
            });
            await clan.save();
            return res.status(201).json({ msg: `Request sent` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const approveRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;

        const clan = await Clan.findById(clanId);

        if (!clan) return res.status(404).json({ error: "Not found" });

        if (
            !(
                clan.creator.toString() === userId.toString() ||
                clan.moderators.includes(userId)
            )
        )
            return res.status(403).json({ error: "Unauthorized" });

        if (clan.members.length >= clan.maxMembers)
            return res.status(400).json({ error: "Clan is full" });

        clan.joinRequests.pull({ user: memberId });
        clan.members.addToSet(memberId);
        await clan.save();

        return res.status(202).json({ msg: "User successfully added" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;

        const clan = await Clan.findById(clanId);

        if (!clan) return res.status(404).json({ error: "Not found" });

        if (
            !(
                clan.creator.toString() === userId.toString() ||
                clan.moderators.includes(userId)
            )
        )
            return res.status(403).json({ error: "Unauthorized" });

        clan.joinRequests.pull({ user: memberId });

        await clan.save();

        return res.status(202).json({ msg: "Request removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeMember = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;
        if (!clan) return res.status(404).json({ error: "Not found" });

        if (
            !(
                clan.creator.toString() === userId.toString() ||
                clan.moderators.includes(userId)
            )
        )
            return res.status(403).json({ error: "Unauthorized" });

        clan.members.pull(memberId);

        await clan.save();

        res.status(202).json({ msg: "User successfully removed" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addModerator = async (req, res) => {
    try {
        const userId = req.user._id;
        const { clanId, memberId } = req.params;
        const clan = await Clan.findById(clanId);
        const targetUser = await User.findById(memberId);
        if (!clan) {
            return res.status(404).json({ error: "Not found" });
        }

        if (!(clan.creator.toString() === userId.toString())) {
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
        const clan = await Clan.findById(clanId);
        const targetUser = await User.findById(memberId);
        if (!clan) {
            return res.status(404).json({ error: "Not found" });
        }

        if (!(clan.creator.toString() === userId.toString())) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (!clan.moderators.includes(memberId))
            return res
                .status(400)
                .json({ msg: `${targetUser.name} is not a moderator` });

        clan.moderators.pull(memberId);

        await clan.save();

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
