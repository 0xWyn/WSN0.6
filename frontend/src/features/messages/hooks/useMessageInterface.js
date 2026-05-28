import { useEffect, useState } from "react";
import {
    getChatById,
    getConversation,
    markChatRead,
} from "../apis/messageApis";
import { useActiveChatSocket } from "../web/useActiveChatSocket";
import { useEntities } from "../../global/EntityProvider";

export const useMessageInterface = (id) => {
    const { entities, setEntities } = useEntities();
    const [messageIds, setMessageIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useActiveChatSocket(id, setMessageIds);

    const chat = entities.chats[id];
    const messages = messageIds.map((id) => entities.messages[id]);

    useEffect(() => {
        const activateChat = async () => {
            try {
                setLoading(true);

                const [chatRes, threadRes] = await Promise.all([
                    getChatById(id),
                    getConversation(id),
                ]);

                const chat = chatRes.data;
                const thread = threadRes.data;

                setEntities((prev) => ({
                    ...prev,
                    chats: {
                        ...prev.chats,
                        [chat._id]: chat,
                    },

                    messages: {
                        ...prev.messages,
                        ...Object.fromEntries(thread.map((m) => [m._id, m])),
                    },
                }));
                setMessageIds(thread.map((m) => m._id));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        activateChat();
    }, [id]);

    useEffect(() => {
        if (!chat) return;
        markChatRead(chat._id);
    }, [messages, chat]);

    return { chat, messages, loading };
};
