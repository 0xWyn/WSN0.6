import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const user = req.user;
        const notifications = await Notification.find({
            receiver: user._id,
        })
            .sort({ createdAt: -1 })
            .populate("sender", "username avatar")
            .populate("source");

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const readChatNotifications = async (req, res) => {
    try {
        const user = req.user;
        const { chatId } = req.params;
        await Notification.deleteMany({
            sourceModel: "Chat",
            source: chatId,
            receiver: user._id,
        });
        res.status(200).json({ msg: "Notifications cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const readNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ msg: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const user = req.user;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ msg: "Notification not found" });
        }

        if (notification.receiver.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: "Forbidden" });
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ msg: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
