import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clan",
            required: true,
        },
        requestedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

joinRequestSchema.index({
    clan: 1,
    user: 1,
    requestedAt: -1,
});

const ClanJoinRequest = mongoose.model("ClanJoinRequest", joinRequestSchema);

export default ClanJoinRequest;
