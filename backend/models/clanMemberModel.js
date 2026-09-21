import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
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

        joinedAt: { type: Date, default: Date.now },

        role: {
            type: String,
            enum: ["member", "leader", "founder"],
            default: "member",
        },

        status: {
            type: String,
            enum: ["active", "flagged", "banned"],
            default: "active",
        },
    },
    { timestamps: true }
);

memberSchema.index({
    clan: 1,
    joinedAt: -1,
});

memberSchema.index(
    {
        clan: 1,
        user: 1,
    },
    { unique: true }
);

const ClanMember = mongoose.model("ClanMember", memberSchema);

export default ClanMember;
