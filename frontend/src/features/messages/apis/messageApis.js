import API from "../../../utils/axiosInterceptor";

export const getChatById = (chatId) => {
    return API.get(`/chats/${chatId}`);
};

export const getConversation = (chatId) => {
    return API.get(`/chats/use/${chatId}`);
};

export const markChatRead = (chatId) => {
    return API.patch(`/chats/${chatId}/read`);
};

export const createMessage = (message) => {
    return API.post(`/messages`, message);
};

export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export const patchMessage = (messageId, text) =>
    API.patch(`/messages/${messageId}`, text);
