import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";
import { useState } from "react";

export const useMessageSocket = (id, setMessageIds, setMessagesById) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.emit("join_chat", id);

        const handleNewMessage = (message) => {
            if (message.chat !== id) return;

            setMessageIds((prev) => {
                const newIds = [...new Set([...prev, message._id])];

                return newIds;
            });

            setMessagesById((prev) => ({ ...prev, [message._id]: message }));
        };

        const handleDeletedMessage = (message) => {
            if (message.chat !== id) return;

            setMessageIds((prev) => {
                const ids = [...prev];
                const newIds = ids.filter((id) => id !== message._id);
                return newIds;
            });

            setMessagesById((prev) => {
                const map = { ...prev };
                delete map[message._id];
                return map;
            });

            alert("Message Deleted");
        };

        const handleEditedMessage = (message) => {
            if (message.chat.toString() !== id) return;

            setMessagesById((prev) => {
                const map = { ...prev };
                map[message._id] = message;

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
        };
    }, [socket]);
};
