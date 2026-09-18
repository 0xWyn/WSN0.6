export const upsertNotifications = (notifications, prev) => {
    const map = { ...prev };

    notifications.forEach((notification) => {
        map.notifications = {
            ...map.notifications,
            [notification._id]: notification,
        };
    });

    return map;
};

export const updateNotificationReadAt = (notifications, prev) => {
    const map = { ...prev };

    notifications.forEach((notification) => {
        map.notifications = {
            ...map.notifications,
            [notification._id]: { ...notification, readAt: new Date() },
        };
    });

    return map;
};
