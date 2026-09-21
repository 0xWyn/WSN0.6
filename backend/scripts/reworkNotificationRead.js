import mongoose from "mongoose";
import dotenv from "dotenv";
import Notification from "../models/notificationModel.js";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDb 🚀");

    const updated = await Notification.collection.updateMany(
        { read: { $exists: true } },
        {
            $unset: { read: "" },
        }
    );

    console.log(
        `MATCHED: ${updated.matchedCount} documents. UPDATED: ${updated.modifiedCount} documents.`
    );

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
