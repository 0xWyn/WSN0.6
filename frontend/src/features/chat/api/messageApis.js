import API from "../../../utils/axiosInterceptor";

export const createMessage = (message) => {
    return API.post(`/messages`, message);
};

export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export const patchMessage = (messageId, text) =>
    API.patch(`/messages/${messageId}`, text);
