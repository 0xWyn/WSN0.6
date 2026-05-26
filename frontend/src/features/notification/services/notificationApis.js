import API from "../../../utils/axiosInterceptor";

export const getNotifications = (userId) => {
    return API.get(`notifications/${userId}`);
};
