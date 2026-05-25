import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["message", "like", "comment", "follow"],
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            default: null,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
