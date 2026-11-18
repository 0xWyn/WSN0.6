import { useEffect } from "react";
import { useEntityActions } from "../../global/useEntityActions";
import { useSocket } from "../../socket/SocketProvider";

export const useUserSocket = (userId) => {
    const { socket } = useSocket();
    const { mergeUsers } = useEntityActions();

    useEffect(() => {
        if (!socket || !userId) return;

        const joinProfile = () => {
            console.log("Joining profile");
            socket.emit("profile_opened", userId);
        };

        if (socket.connected) joinProfile();

        socket.on("connect", joinProfile);

        const handleUserUpdate = (userUpdate) => {
            if (userUpdate._id !== userId) return;

            console.log(userUpdate);
            mergeUsers([userUpdate]);
        };

        socket.on("updated_user", handleUserUpdate);

        return () => {
            socket.off("connect", joinProfile);
            socket.off("updated_user", handleUserUpdate);

            if (socket.connected) {
                socket.emit("profile_closed", userId);
            }
        };
    }, [socket, userId]);
};
