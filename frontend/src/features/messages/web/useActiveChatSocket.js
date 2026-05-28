import { useEffect } from "react";
import { useAuth } from "../../auth/context/AuthProvider";
import { useSocket } from "../../socket/SocketProvider";
import { useEntities } from "../../global/EntityProvider";

export const useActiveChatSocket = (id, setMessageIds) => {
    const { socket } = useSocket();
    const { user } = useAuth();
    const { entities, setEntities } = useEntities();

    useEffect(() => {
        if (!socket) return;

        socket.emit("join_chat", id);
        socket.emit("chat_opened", { userId: user._id, chatId: id });

        const handleNewMessage = (message) => {
            if (message.chat !== id) return;

            setMessageIds((prev) => {
                const newIds = [...new Set([...prev, message._id])];

                return newIds;
            });

            setEntities((prev) => ({
                ...prev,
                messages: {
                    ...prev.messages,
                    [message._id]: message,
                },
            }));
        };

        const handleDeletedMessage = (message) => {
            if (message.chat !== id) return;

            setMessageIds((prev) => {
                const ids = [...prev];
                const newIds = ids.filter((id) => id !== message._id);
                return newIds;
            });

            setEntities((prev) => {
                const map = { ...prev };
                delete map.messages[message._id];
                return map;
            });

            alert("Message Deleted");
        };

        const handleEditedMessage = (message) => {
            if (message.chat.toString() !== id) return;

            setEntities((prev) => {
                const map = { ...prev };
                map.messages[message._id] = message;

                return map;
            });

            alert("Edited message");
        };

        socket.on("new_message", handleNewMessage);
        socket.on("deleted_message", handleDeletedMessage);
        socket.on("edited_message", handleEditedMessage);
        return () => {
            socket.off("new_message", handleNewMessage);
            socket.off("deleted_message", handleDeletedMessage);
            socket.off("edited_message", handleEditedMessage);
            socket.emit("leave_chat", id);
            socket.emit("chat_closed", user._id);
        };
    }, [socket]);
};
