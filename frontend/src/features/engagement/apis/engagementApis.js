import API from "../../../utils/axiosInterceptor";

//Like a post
export const togglePostLike = (postId) => {
    return API.patch(`posts/${postId}/like`);
};
//Like a comment
export const toggleCommentLike = (commentId) => {
    return API.patch(`comments/${commentId}/like`);
};
