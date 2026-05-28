import { useEffect, useState } from "react";
import { createChat, getAllChats } from "../api/chatApis.js";
import { useEntities } from "../../global/EntityProvider.jsx";

export const useChatContextLogic = () => {
    const [chatIds, setChatIds] = useState([]);
    const [loadingChats, setLoadingChats] = useState(true);
    const { setEntities } = useEntities();
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await getAllChats();
                setChatIds(data.map((c) => c._id));

                setEntities((prev) => {
                    const map = { ...prev };
                    data.forEach((chat) => {
                        map.chats[chat._id] = chat;

                        chat.participants.forEach(
                            (participant) =>
                                (map.users[participant._id] = participant)
                        );
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

    return { chatIds, setChatIds, loadingChats };
};
