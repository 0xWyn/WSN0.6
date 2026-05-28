import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../socket/SocketProvider";
import { useEntities } from "./EntityProvider";

const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
    const { socket } = useSocket();
    const [presenceById, setPresenceById] = useState({});

    useEffect(() => {
        if (!socket) return;

        console.log("Hit");
        const handlePresence = ({ userId, isOnline }) => {
            console.log("handling presence");
            setPresenceById((prev) => ({ ...prev, [userId]: isOnline }));
        };

        socket.on("presence_update", handlePresence);

        return () => {
            socket.off("presence_update", handlePresence);
        };
    }, [socket]);

    useEffect(() => {
        console.log(presenceById);
    }, [presenceById]);
    return (
        <RealtimeContext.Provider value={{ presenceById }}>
            {children}
        </RealtimeContext.Provider>
    );
};

export const useRealtime = () => useContext(RealtimeContext);
