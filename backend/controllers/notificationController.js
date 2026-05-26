import Notification from "../models/notificationModel";

export const getNotifications = async (req, res) => {
    try {
        const user = req.user;
        const notifications = await Notification.find({
            receiver: user._id,
        }).sort({ createdAt: -1 });

        const messageNotifications = notifications.map(
            (n) => n.type === "message"
        );

        const generalNotifications = notifications.map(
            (n) => !messageNotifications.includes(n)
        );

        res.status(200).json(messageNotifications, generalNotifications);
    } catch (error) {
        res.status(500).json({ error: error });
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
        res.status(500).json({ error: error });
    }
};

export const readNotifications = async();
//read chat notifications = take notifications.type === chat, .source === chatId, .read = true;
// like notification = notification = Notification.findByIdAndUpdate(_id)
