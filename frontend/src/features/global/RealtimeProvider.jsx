import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../socket/SocketProvider";
import { useEntities } from "./EntityProvider";
import { useEntityActions } from "./useEntityActions";

const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
    const { socket } = useSocket();
    const { entities, setEntities } = useEntities();
    const { mergeUsers } = useEntityActions();
    const [presenceById, setPresenceById] = useState({});

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

        const handleUserUpdate = (data) => {
            console.log(entities.users);
            mergeUsers(data);
            console.log(entities.users);
        };

        socket.on("user_follow_update", handleUserUpdate);
        socket.on("user_unfollow_update", handleUserUpdate);
        // Listen for presence updates
        socket.on("presence_update", handlePresence);
        socket.on("online_users_list", handleOnlineUsers);

        return () => {
            socket.off("user_follow_update", handleUserUpdate);
            socket.off("user_unfollow_update", handleUserUpdate);
            socket.off("presence_update", handlePresence);
            socket.off("online_users_list", handleOnlineUsers);
        };
    }, [socket]);

    return (
        <RealtimeContext.Provider value={{ presenceById }}>
            {children}
        </RealtimeContext.Provider>
    );
};

export const useRealtime = () => useContext(RealtimeContext);
