import mongoose from "mongoose";
import dotenv from "dotenv";
import Like from "../models/likeModel.js";

dotenv.config();

async function changeLikeField() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");

    const updated = await Like.updateMany(
        {},
        {
            $rename: { entityType: "entityModel" },
        }
    );

    console.log("Done");

    console.log(updated.modifiedCount);

    await mongoose.disconnect();
}

changeLikeField().catch((err) => {
    console.error(err);
    process.exit(1);
});
