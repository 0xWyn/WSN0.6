import API from "../../../utils/axiosInterceptor";

export const createMessage = (message) => {
    return API.post(`/messages`, message);
};
