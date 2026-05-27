import API from "../../../utils/axiosInterceptor";

export const createChat = (userId) => {
    return API.post(`/chats/${userId}`);
};

export const getAllChats = () => {
    return API.get(`/chats`);
};

export const getChatById = (chatId) => {
    return API.get(`/chats/${chatId}`);
};

export const getConversation = (chatId) => {
    return API.get(`/chats/use/${chatId}`);
};

export const markChatRead = (chatId) => {
    return API.patch(`/chats/${chatId}/read`);
};
