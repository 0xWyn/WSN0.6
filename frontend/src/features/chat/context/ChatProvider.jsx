import { useContext, createContext, useState } from "react";
import { useChatContextLogic } from "../hooks/useChatContextLogic";
import { useAuth } from "../../auth/context/AuthProvider";
import { useChatSocket } from "../socket/useChatSocket";
import { useEffect } from "react";
const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const { chatIds, chatsById, setChatIds, setChatsById, loadingChats } =
        useChatContextLogic();

    useChatSocket(chatIds, chatsById, setChatsById);

    return (
        <ChatContext.Provider value={{ chatIds, chatsById, loadingChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
