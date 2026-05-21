import API from "../../../utils/axiosInterceptor";

export const getUserPosts = (userId, page = 1) => {
    return API.get(`users/${userId}/posts?page=${page}`);
};

// in getting user, spread user and add is following from req.user
export const getUser = (userId) => {
    return API.get(`users/${userId}`);
};

export const toggleFollow = (userId) => {
    return API.patch(`users/${userId}/follow`);
};
