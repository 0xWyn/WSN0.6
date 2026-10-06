import mongoose from "mongoose";

const clanSchema = new mongoose.Schema(
    {
        name: String,
        founder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: String,
        avatar: {
            url: {
                type: String,
                default: "",
            },
            type: {
                type: String,
                enum: ["image", "video"],
                default: "image",
            },
            publicId: {
                type: String,
                default: "",
            },
        },
        banner: {
            url: {
                type: String,
                default: "",
            },
            type: {
                type: String,
                enum: ["image", "video"],
                default: "image",
            },
            publicId: {
                type: String,
                default: "",
            },
        },
        domain: String,
        tags: [String],
        access: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
        privateSettings: {
            allowJoinRequests: { type: Boolean, default: true },
        },
        maxMembers: {
            type: Number,
            default: 12,
        },
        status: {
            type: String,
            enum: ["active", "deactivated"],
            default: "active",
        },
        deletionScheduledAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

clanSchema.index({
    name: "text",
    description: "text",
});

const Clan = mongoose.model("Clan", clanSchema);

export default Clan;
