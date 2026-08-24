import mongoose from "mongoose";
import Clan from "../models/clanModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const clans = await Clan.find({
        "joinRequests.0": { $exists: true },
    });

    console.log(`Found ${clans.length} clans with join requests`);

    for (const clan of clans) {
        let changed = false;

        for (const request of clan.joinRequests) {
            request.requestedAt = request._id.getTimestamp();
        }

        changed = true;

        if (changed) {
            await clan.save();
            console.log(`Updated clan ${clan._id}`);
        }
    }

    console.log("Done");

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
