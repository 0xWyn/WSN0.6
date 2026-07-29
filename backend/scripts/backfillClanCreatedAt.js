import mongoose from "mongoose";
import Clan from "../models/clanModel.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    const clans = await Clan.find({ createdAt: { $exists: false } })
        .select("_id")
        .lean();

    console.log(`Found ${clans.length} clans without createdAt`);

    for (const clan of clans) {
        await Clan.collection.updateOne(
            { _id: clan._id },
            {
                $set: {
                    createdAt: clan._id.getTimestamp(),
                    updatedAt: clan._id.getTimestamp(),
                },
            }
        );
    }

    console.log(`Updated ${clans.length} clans`);
    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
