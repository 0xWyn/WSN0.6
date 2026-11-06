import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";

export const useFeedRoom = (type, id) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket || !id) return;

        const joinFeed = () => {
            socket.emit("join_feed", { type, id });
        };

        if (socket.connected) joinFeed();

        socket.on("connect", joinFeed);

        return () => {
            socket.off("connect", joinFeed);

            if (socket.connected) {
                socket.emit("leave_feed", { type, id });
            }
        };
    }, [socket, type, id]);
};
