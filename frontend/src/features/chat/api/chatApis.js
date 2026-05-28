import API from "../../../utils/axiosInterceptor";

export const createChat = (userId) => {
    return API.post(`/chats/${userId}`);
};

export const getAllChats = () => {
    return API.get(`/chats`);
};
