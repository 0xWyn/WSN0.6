import { useEntities, useSetEntities } from "../../global/EntityProvider";
import { readNotifications } from "../apis/notificationApis";
import { useNotification } from "../context/NotificationProvider";
import { updateNotificationReadAt } from "../helpers/updateNotificationsEntity";

export const useNotificationActions = () => {
    const { unread } = useNotification();
    const { setEntities } = useSetEntities();

    const markNotificationsRead = async () => {
        try {
            const unreadIds = unread.map((notif) => notif._id);

            if (!unreadIds > 0)
                return console.log({
                    msg: "No unread notfications to update.",
                });
            const { data } = await readNotifications(unreadIds);
            console.log(data);

            setEntities((prev) => updateNotificationReadAt(unread, prev));
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return { markNotificationsRead };
};
