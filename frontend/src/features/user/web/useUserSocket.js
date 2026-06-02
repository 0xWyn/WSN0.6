import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";
import { useEntities } from "../../global/EntityProvider";
import { useEntityActions } from "../../global/useEntityActions";
export const useActiveChatSocket = (id, setMessageIds) => {
    const { socket } = useSocket();

    const { mergeUsers } = useEntityActions();

    useEffect(() => {
        if (!socket) return;

        const handleUserUpdate = ([data]) => {
            console.log(data);
            // mergeUsers([user]);
        };

        socket.on("user_follow_update", handleUserUpdate);
        return () => {
            socket.off("user_follow_update", handleUserUpdate);
        };
    }, [socket]);
};
