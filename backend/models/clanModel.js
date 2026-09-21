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
        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
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
