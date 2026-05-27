import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";

export const useChatSocket = (chatIds, chatsById, setChatsById) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        console.log("triggered");

        const handleUpdatedChat = (data) => {
            const { chatId, userId, unreadCount } = data;
            console.log(data);
            const valid = chatIds.some((id) => id === chatId);
            if (!valid) {
                console.log("Returning, invalid");
                return;
            }

            setChatsById((prev) => {
                const map = { ...prev };
                map[chatId] = {
                    ...prev[chatId],
                    unreadCounts: {
                        ...prev[chatId]?.unreadCounts,
                        [userId]: unreadCount,
                    },
                };

                return map;
            });

            console.log("Done");
        };

        socket.on("chat_unread_update", handleUpdatedChat);

        return () => {
            socket.off("chat_unread_update", handleUpdatedChat);
        };
    }, [socket, chatIds]);
};
