import mongoose from "mongoose";

const clanSchema = new mongoose.Schema({
    name: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    moderators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    visibility: {
        type: String,
        enum: ["public", "request", "private"],
        default: "public",
    },
    joinRequests: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            status: {
                type: String,
                enum: ["Pending", "Accepted", "Rejected"],
                default: "Pending",
            },
        },
    ],
    maxMembers: {
        type: Number,
        default: 12,
    },
    logo: String,
});

const Clan = mongoose.model("Clan", clanSchema);

export default Clan;
