import API from "../../../../utils/axiosInterceptor";

export const getPostById = (postId) => {
    return API.get(`posts/${postId}`);
};
