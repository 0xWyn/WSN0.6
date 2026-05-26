import { useEffect, useState } from "react";
import { createChat, getAllChats } from "../api/chatApis.js";

export const useChatContextLogic = () => {
    const [chatsById, setChatsById] = useState({});
    const [chatIds, setChatIds] = useState([]);
    const [loadingChats, setLoadingChats] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await getAllChats();
                setChatIds(data.map((c) => c._id));
                setChatsById(() => {
                    const map = {};
                    data.forEach((c) => {
                        map[c._id] = c;
                    });

                    return map;
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingChats(false);
            }
        };

        fetchChats();
    }, []);

    return { chatIds, chatsById, loadingChats };
};
