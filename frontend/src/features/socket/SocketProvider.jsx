import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../auth/context/AuthProvider";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const socketRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            // Disconnect if user logs out
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        // Prevent duplicate socket connections
        if (socketRef.current?.connected) {
            return;
        }

        // Create socket connection with better configuration
        socketRef.current = io("http://localhost:5000", {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            transports: ["websocket", "polling"],
        });

        // Emit join event on connection
        const handleConnect = () => {
            console.log("Socket connected:", socketRef.current.id);
            socketRef.current.emit("join", user._id);
        };

        // Handle connection errors
        const handleConnectError = (error) => {
            console.error("Socket connection error:", error);
        };

        // Handle disconnect
        const handleDisconnect = (reason) => {
            console.warn("Socket disconnected:", reason);
        };

        socketRef.current.on("connect", handleConnect);
        socketRef.current.on("connect_error", handleConnectError);
        socketRef.current.on("disconnect", handleDisconnect);

        // Cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.off("connect", handleConnect);
                socketRef.current.off("connect_error", handleConnectError);
                socketRef.current.off("disconnect", handleDisconnect);
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);
