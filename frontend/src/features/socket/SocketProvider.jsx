import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../auth/context/AuthProvider";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const socketRef = useRef(null);
    const { user } = useAuth();
    const socket = socketRef.current;

    useEffect(() => {
        const initSocket = () => {
            if (!user) return;
            if (socketRef.current) return;

            socketRef.current = io("http://localhost:5000");

            socketRef.current.on("connect", () => {
                socketRef.current.emit("join", user._id);
            });

            return () => {
                socketRef.current.disconnect();
                socketRef.current = null;
            };
        };

        initSocket();
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);
