import mongoose from "mongoose";
import Clan from "../models/clanModel.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    const update = await Clan.updateMany(
        { visibility: "public" },
        {
            $set: {
                access: "public",
            },
            $unset: { visibility: "" },
        }
    );

    console.log(
        `Updated Count:" ${update.matchedCount} clans`,
        `Modified Count:" ${update.modifiedCount} clans`
    );
    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
