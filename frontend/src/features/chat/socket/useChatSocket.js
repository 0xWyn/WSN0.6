import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";
import { useEntities } from "../../global/EntityProvider";

export const useChatSocket = (chatIds, setChatIds) => {
    const { socket } = useSocket();
    const { entities, setEntities } = useEntities();
    useEffect(() => {
        if (!socket) return;

        const handleUnreadMessage = (data) => {
            const { chatId, userId, unreadCount } = data;

            if (!chatIds.includes(chatId)) return;

            setEntities((prev) => {
                const map = { ...prev };
                map.chats[chatId] = {
                    ...prev.chats[chatId],
                    unreadCounts: {
                        ...prev.chats[chatId]?.unreadCounts,
                        [userId]: unreadCount,
                    },
                };

                return map;
            });
        };

        const handleUpdatedChat = ({ chatId, lastMessage, updatedAt }) => {
            if (!chatIds.includes(chatId)) return;

            setChatIds((prev) => [
                chatId,
                ...prev.filter((id) => id !== chatId),
            ]);
            setEntities((prev) => ({
                ...prev,
                chats: {
                    ...prev.chats,
                    [chatId]: { ...prev.chats[chatId], lastMessage, updatedAt },
                },
            }));
        };

        socket.on("chat_unread_update", handleUnreadMessage);
        socket.on("chat_lastMessage_update", handleUpdatedChat);

        return () => {
            socket.off("chat_unread_update", handleUnreadMessage);
            socket.off("chat_lastMessage_update", handleUpdatedChat);
        };
    }, [socket, chatIds]);
};
