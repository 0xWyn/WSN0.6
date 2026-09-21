import API from "../../../utils/axiosInterceptor";

export const getNotifications = () => {
    return API.get(`notifications`);
};

export const readNotifications = (ids) => {
    return API.patch(`notifications/read`, ids);
};
