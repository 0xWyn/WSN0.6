import { uploadAllFiles } from "../../../utils/uploadToCloud";
import { deletePost, fetchPost, makePost } from "../api/feedApis";

export const usePostActions = () => {
    const handleNewPost = async (post) => {
        try {
            console.log("Hit");
            const media = await uploadAllFiles(post.media, { folder: "posts" });
            const body = {
                text: post.text,
                media,
            };
            const res = await makePost(body);
            return res.data;
        } catch (error) {
            console.error(error.response);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
        } catch (error) {
            console.error(error.response);
        }
    };

    return {
        handleNewPost,
        handleDeletePost,
    };
};
