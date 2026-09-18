import ClanJoinRequest from "../models/clanJoinRequestModel.js";
import ClanMember from "../models/clanMemberModel.js";
import Clan from "../models/clanModel.js";

export const explore = async (req, res) => {
    try {
        const userId = req.user._id;

        const [clans, memberships, joinRequests] = await Promise.all([
            Clan.find({}).populate("founder", "name avatar username").lean(),
            ClanMember.find({ user: userId }).lean(),
            ClanJoinRequest.find({ user: userId }).lean(),
        ]);

        const membershipMap = new Map(
            memberships.map((membership) => [
                membership.clan.toString(),
                membership.role,
            ])
        );

        const requestMap = joinRequests.map(({ clan }) => clan.toString());

        const clansAuth = clans.map((clan) => ({
            ...clan,
            role: membershipMap.get(clan._id.toString()) ?? null,
            requested: requestMap.includes(clan._id.toString()),
        }));

        res.status(200).json(clansAuth);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
