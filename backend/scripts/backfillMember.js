import mongoose from "mongoose";
import Clan from "../models/clanModel.js";
import ClanMember from "../models/clanMemberModel.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    const clans = await Clan.find({});

    const updates = clans.map((clan) => ({
        user: clan.founder,
        clan: clan._id,
        role: "founder",
        joinedAt: clan.createdAt,
    }));
    const result = await ClanMember.collection.insertMany(updates);

    console.log(`Updated ${result.insertedCount} documents`);
    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
