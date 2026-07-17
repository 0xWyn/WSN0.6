import { CLAN_CATEGORIES } from "../config/clanCategories.js";
import { DOMAINS } from "../config/domains.js";
import { IncomingMessage } from "http";
import Clan from "../models/clanModel.js";

export const explore = async (req, res) => {
    try {
        const clans = await Clan.find({});

        res.status(200).json(clans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
