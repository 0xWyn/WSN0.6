import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";
import { useClan } from "../clans/context/ClanProvider";
import { upsertClans } from "../clans/helpers/updateClanEntities";
import { upsertNotifications } from "../notification/helpers/updateNotificationsEntity";
import { useSocket } from "../socket/SocketProvider";
import { useSetEntities } from "./EntityProvider";
import { useNotification } from "../notification/context/NotificationProvider";

const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
    const { socket } = useSocket();
    const auth = useCurrentUser();
    const { setEntities } = useSetEntities();
    const { setMyClanIds } = useClan();

    const [presenceById, setPresenceById] = useState({});

    const { setUnread } = useNotification();

    useEffect(() => {
        if (!socket) return;

        // Request initial presence data
        socket.emit("get_online_users");

        const handlePresence = ({ userId, isOnline }) => {
            setPresenceById((prev) => ({ ...prev, [userId]: isOnline }));
        };

        // Handle initial online users list
        const handleOnlineUsers = (onlineUserIds) => {
            const presence = {};
            onlineUserIds.forEach((userId) => {
                presence[userId] = true;
            });
            setPresenceById(presence);
        };

        const handleApprovedRequest = (clan) => {
            console.log("Handling approved request for", auth.username);
            setEntities((prev) => upsertClans([clan], prev));
            setMyClanIds((prev) => [...new Set([...prev, clan._id])]);
        };

        const handleRevokedMembership = (clan) => {
            setEntities((prev) => upsertClans([clan], prev));
            setMyClanIds((prev) => prev.filter((id) => id !== clan._id));
        };

        const handleNotification = (notification) => {
            console.log(notification);
            setEntities((prev) => upsertNotifications([notification], prev));
            setUnread((prev) => {
                const map = [...prev];
                map.push(notification);
                return map;
            });
        };

        socket.on("presence_update", handlePresence);
        socket.on("online_users_list", handleOnlineUsers);

        socket.on("approved_request", handleApprovedRequest);
        socket.on("revoked_membership", handleRevokedMembership);
        socket.on("notification", handleNotification);
        socket.on("exited_clan", handleRevokedMembership);

        return () => {
            socket.off("presence_update", handlePresence);
            socket.off("online_users_list", handleOnlineUsers);

            socket.off("approved_request", handleApprovedRequest);
            socket.off("revoked_membership", handleRevokedMembership);
            socket.off("notification", handleNotification);
            socket.off("exited_clan", handleRevokedMembership);
        };
    }, [socket]);

    return (
        <RealtimeContext.Provider value={{ presenceById }}>
            {children}
        </RealtimeContext.Provider>
    );
};

export const useRealtime = () => useContext(RealtimeContext);
