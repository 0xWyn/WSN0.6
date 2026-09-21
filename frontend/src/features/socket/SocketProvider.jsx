import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);
    const user = useCurrentUser();

    const userId = user?._id;
    useEffect(() => {
        if (!userId) {
            // Disconnect if user logs out
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        // Prevent duplicate socket connections
        if (socketRef.current) {
            return;
        }

        // Create socket connection with better configuration
        const newSocket = io("http://localhost:5000", {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
            transports: ["websocket", "polling"],
        });

        socketRef.current = newSocket;

        setSocket(newSocket);

        // Emit join event on connection
        const handleConnect = () => {
            newSocket.emit("join", userId);
        };

        // Handle connection errors
        const handleConnectError = (error) => {
            console.error("Socket connection error:", error);
        };

        // Handle disconnect
        const handleDisconnect = (reason) => {
            console.warn("Socket disconnected:", reason);
        };

        newSocket.on("connect", handleConnect);
        newSocket.on("connect_error", handleConnectError);
        newSocket.on("disconnect", handleDisconnect);

        // Cleanup function
        return () => {
            if (socketRef.current) {
                newSocket.off("connect", handleConnect);
                newSocket.off("connect_error", handleConnectError);
                newSocket.off("disconnect", handleDisconnect);

                newSocket.disconnect();

                if (socketRef.current === newSocket) {
                    socketRef.current = null;
                }
            }
        };
    }, [userId]);

    useEffect(() => {
        if (!socket) return;
        console.log("socket changed", socket);
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);
