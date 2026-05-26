import Notification from "../models/notificationModel.js";

export const createNotification = async ({
    type,
    sender,
    receiver,
    sourceModel,
    source,
}) => {
    const notification = await Notification.create({
        type,
        sender,
        receiver,
        sourceModel,
        source,
    });

    return notification;
};
