import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../socket/SocketProvider";
import { useEntities } from "./EntityProvider";

const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
    const { socket } = useSocket();
    const [presenceById, setPresenceById] = useState({});

    useEffect(() => {
        if (!socket) return;

        const handlePresence = ({ userId, isOnline }) => {
            setPresenceById((prev) => ({ ...prev, [userId]: isOnline }));
        };

        socket.on("presence_update", handlePresence);

        return () => {
            socket.off("presence_update", handlePresence);
        };
    }, [socket]);

    return (
        <RealtimeContext.Provider value={{ presenceById }}>
            {children}
        </RealtimeContext.Provider>
    );
};

export const useRealtime = () => useContext(RealtimeContext);
