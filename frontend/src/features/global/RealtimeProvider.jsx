import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../socket/SocketProvider";

const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
    const { socket } = useSocket();
    const [presenceById, setPresenceById] = useState({});

    useEffect(() => {
        if (!socket) return;

        const handlePresence = ({ userId, isOnline }) => {
            setPresenceById((prev) => ({ ...prev, [userId]: isOnline }));
        };

        // Listen for presence updates
        socket.on("presence_update", handlePresence);

        // Request initial presence data
        socket.emit("get_online_users");

        // Handle initial online users list
        const handleOnlineUsers = (onlineUserIds) => {
            const presence = {};
            onlineUserIds.forEach((userId) => {
                presence[userId] = true;
            });
            setPresenceById(presence);
        };

        socket.on("online_users_list", handleOnlineUsers);

        return () => {
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
