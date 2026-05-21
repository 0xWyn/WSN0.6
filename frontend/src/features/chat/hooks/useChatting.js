import { useEffect, useState } from "react";
import { getChatById, getConversation } from "../api/chatApis";

export const useChatting = (id) => {
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching chat is important for UI design
    // Handling messages is a separate concern.
    // This will also deal with messages (via sockets)
    useEffect(() => {
        const activateChat = async () => {
            try {
                setLoading(true);
                const chatRes = await getChatById(id);
                console.log(chatRes.data);
                setChat(chatRes.data);
                const messagesRes = await getConversation(id);
                setMessages(messagesRes.data);
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
