import { useContext, createContext, useState } from "react";
import { useChatContextLogic } from "../hooks/useChatContextLogic";
import { useAuth } from "../../auth/context/AuthProvider";
const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const { chatIds, chatsById, loadingChats } = useChatContextLogic();

    return (
        <ChatContext.Provider value={{ chatIds, chatsById, loadingChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
