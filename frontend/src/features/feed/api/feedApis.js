import API from "../../../utils/axiosInterceptor";

export const getUsers = () => {
    return API.get("users");
};

export const makePost = (data) => {
    return API.post("posts", data);
};

export const deletePost = (postId) => {
    return API.delete(`posts/${postId}`);
};

export const getPosts = (page = 1) => {
    return API.get(`posts?page=${page}&limit=20`);
};

export const fetchPost = (postId) => {
    return API.get(`posts/${postId}`);
};

export const getUserPosts = (userId, page = 1) => {
    return API.get(`users/${userId}/posts?page=${page}`);
};
