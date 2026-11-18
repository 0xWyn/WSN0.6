import API from "../../../utils/axiosInterceptor";

export const getUserPosts = (userId, page = 1) => {
    return API.get(`users/${userId}/posts?page=${page}`);
};

export const getUser = (userId) => {
    return API.get(`users/${userId}`);
};

export const addFollow = (userId) => {
    return API.put(`users/${userId}/follow`);
};

export const removeFollow = (userId) => {
    return API.delete(`users/${userId}/follow`);
};

export const patchProfile = (data) => {
    return API.patch(`users/profile`, data);
};

export const fetchFollowing = (userId) => {
    return API.get(`users/${userId}/following`);
};

export const fetchFollowers = (userId) => {
    return API.get(`users/${userId}/followers`);
};
