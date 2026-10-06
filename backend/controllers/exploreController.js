import ClanJoinRequest from "../models/clanJoinRequestModel.js";
import ClanMember from "../models/clanMemberModel.js";
import Clan from "../models/clanModel.js";

export const explore = async (req, res) => {
    try {
        const userId = req.user._id;
        const userMemberships = await ClanMember.find({ user: userId }).select(
            "clan"
        );

        const membershipMap = userMemberships.map(({ clan }) => clan);

        const notJoined = await Clan.find({
            _id: { $nin: membershipMap },
        }).populate("founder", "name username avatar");

        const result = notJoined.map((clan) => ({
            ...clan.toObject(),
            role: null,
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
