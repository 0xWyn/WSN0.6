import { createContext, useContext, useEffect, useState } from "react";
import { upsertNotifications } from "../helpers/updateNotificationsEntity";
import { getNotifications } from "../apis/notificationApis";
import { useSetEntities } from "../../global/EntityProvider";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [unread, setUnread] = useState(0);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const { setEntities } = useSetEntities();
    const user = useCurrentUser();

    // paginate fetching, limit 20, but how do we do like tiktok and get multiple notifications into the same batch?

    useEffect(() => {
        async function fetchNotifications() {
            if (!user) return;
            console.log("fetchingNotifications");
            try {
                setLoadingNotifications(true);
                const { data } = await getNotifications();
                const unread = data.filter((notif) => !notif.readAt);
                setUnread(unread);

                setEntities((prev) => upsertNotifications(data, prev));
            } catch (error) {
                console.log(error.response.data);
            } finally {
                setLoadingNotifications(false);
            }
        }

        fetchNotifications();
    }, [user]);
    return (
        <NotificationContext.Provider
            value={{
                unreadCount: unread.length ?? "0",
                unread,
                setUnread,
                loadingNotifications,
                setLoadingNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
