import mongoose from "mongoose";

const clanSchema = new mongoose.Schema(
    {
        name: String,
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
        owner: {
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
            enum: ["public", "private"],
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
    },
    { timestamps: true }
);

clanSchema.index({
    name: "text",
    description: "text",
});

const Clan = mongoose.model("Clan", clanSchema);

export default Clan;
