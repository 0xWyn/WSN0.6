import API from "../../../../utils/axiosInterceptor";

export const getPostById = (postId) => {
    return API.get(`posts/single/${postId}`);
};

export const addPostLike = (postId) => {
    return API.put(`posts/${postId}/like`);
};

export const removePostLike = (postId) => API.delete(`posts/${postId}/like`);
