import API from "../../../../utils/axiosInterceptor";

export const fetchComments = (postId) => {
    return API.get(`posts/${postId}/comments`);
};

export const postComment = (comment) => {
    return API.post(`comments`, comment);
};

export const getReplies = (id) => {
    return API.get(`comments/${id}/replies`);
};
