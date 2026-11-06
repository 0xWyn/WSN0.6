import Notification from "../models/notificationModel.js";

export const clanNotificationService = async (
    event,
    clanId,
    receiver,
    metadata
) => {
    return Notification.create({
        event,
        entity: clanId,
        entityModel: "Clan",
        receiver,
        metadata,
    });
};

export const postNotificationService = async (
    event,
    postId,
    receiver,
    metadata
) =>
    Notification.create({
        event,
        entity: postId,
        entityModel: "Post",
        receiver,
        metadata,
    });

export const userNotificationService = async (
    event,
    actorId,
    receiver,
    metadata
) =>
    Notification.create({
        event,
        entity: actorId,
        entityModel: "User",
        receiver,
        metadata,
    });

export const commentNotificationService = async (
    event,
    commentId,
    receiver,
    metadata
) =>
    Notification.create({
        event,
        entity: commentId,
        entityModel: "Comment",
        receiver,
        metadata,
    });
