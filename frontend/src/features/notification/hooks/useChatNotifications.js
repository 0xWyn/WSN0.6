import { useMemo } from "react";

import { useChat } from "../../chat/context/ChatProvider";
import { useAuth } from "../../auth/context/AuthProvider";

export const useChatNotifications = () => {
    const { user } = useAuth();

    const { chatIds, chatsById } = useChat();

    return useMemo(() => {
        if (!user) return {};

        const map = {};

        chatIds.forEach((id) => {
            map[id] = chatsById[id]?.unreadCounts[user._id] ?? 0;
        });

        const totalMessages = Object.values(map).reduce(
            (total, unread) => total + unread,
            0
        );

        return { map, totalMessages };
    }, [chatIds, chatsById, user]);
};
