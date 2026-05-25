import { useEffect, useState } from "react";
import { getChatById, getConversation } from "../api/chatApis";
import { useMessageSocket } from "../socket/useMessageSocket";

export const useChatting = (id) => {
    const [chat, setChat] = useState(null);
    const [messageIds, setMessageIds] = useState([]);
    const [messagesById, setMessagesById] = useState({});
    const [loading, setLoading] = useState(true);

    useMessageSocket(id, setMessageIds, setMessagesById);

    const messages = messageIds.map((id) => messagesById[id]);

    useEffect(() => {
        const activateChat = async () => {
            try {
                setLoading(true);

                const [chat, thread] = await Promise.all([
                    getChatById(id),
                    getConversation(id),
                ]);
                setChat(chat.data);

                setMessageIds(thread.data.map((message) => message._id));

                setMessagesById((prev) => {
                    const map = { ...prev };

                    thread.data.forEach((m) => {
                        map[m._id] = m;
                    });

                    return map;
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        activateChat();
    }, [id]);

    return { chat, messages, loading };
};
