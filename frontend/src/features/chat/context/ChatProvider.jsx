import { useContext, createContext, useState } from "react";
import { useChatContextLogic } from "../hooks/useChatContextLogic";
import { useAuth } from "../../auth/context/AuthProvider";
import { useChatSocket } from "../socket/useChatSocket";
import { useEffect } from "react";
const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    const { chatIds, setChatIds, loadingChats } = useChatContextLogic();

    useChatSocket(chatIds, setChatIds);

    return (
        <ChatContext.Provider value={{ chatIds, loadingChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
