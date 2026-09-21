import { useMemo } from "react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useChatContextLogic } from "../../chat/hooks/useChatContextLogic";
import { useEntities } from "../../global/EntityProvider";

export const useChatNotifications = () => {
    const user = useCurrentUser();

    const { chatIds } = useChatContextLogic();
    const { entities } = useEntities();

    return useMemo(() => {
        if (!user) return {};

        const map = {};

        chatIds.forEach((id) => {
            map[id] = entities.chats[id]?.unreadCounts[user._id] ?? 0;
        });

        const totalMessages = Object.values(map).reduce(
            (total, unread) => total + unread,
            0
        );

        return { map, totalMessages };
    }, [chatIds, entities.chats, user]);
};
