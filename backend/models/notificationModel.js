import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [
                "like",
                "comment",
                "reply",
                "follow",

                "clan_promotion",
                "clan_demotion",
                "clan_membership_approval",
                "clan_kick",
                "clan_ban",
            ],
            required: true,
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        entity: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "entityModel",
        },

        entityModel: {
            type: String,
            enum: ["Post", "Comment", "Clan", "Follow"],
            required: true,
        },

        metadata: {
            type: mongoose.SchemaTypes.Mixed,
            default: {},
        },
        readAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

notificationSchema.index({
    receiver: 1,
    readAt: 1,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
