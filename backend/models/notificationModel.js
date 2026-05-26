import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["message", "like", "comment", "reply", "follow"],
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sourceModel: {
            type: String,
            enum: ["Chat", "Post", "Comment"],
            required: true,
        },
        source: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "sourceModel",
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
