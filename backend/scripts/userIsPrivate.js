import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const userIsPrivate = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("CONNECTED");

    const updatedUsers = await User.updateMany(
        {},
        {
            $set: { isPrivate: false },
        }
    );

    console.log("UPDATED", updatedUsers.modifiedCount, "USERS");

    await mongoose.disconnect();
};

userIsPrivate().catch((err) => {
    console.error(err);
    process.exit(1);
});
