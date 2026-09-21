import API from "../../../utils/axiosInterceptor";

export const getUserPosts = (userId, page = 1) => {
    return API.get(`users/${userId}/posts?page=${page}`);
};

export const getUser = (userId) => {
    return API.get(`users/${userId}`);
};

export const toggleFollow = (userId) => {
    return API.patch(`users/${userId}/follow`);
};

export const patchProfile = (data) => {
    return API.patch(`users/profile`, data);
};
