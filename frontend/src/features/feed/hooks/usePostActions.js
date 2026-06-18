import { uploadAllFiles } from "../../../utils/uploadToCloud";
import { deletePost, fetchPost, makePost } from "../api/feedApis";

export const usePostActions = () => {
    const handleNewPost = async (post) => {
        try {
            const { text, clan } = post;
            const media = await uploadAllFiles(post.media, { folder: "posts" });
            const body = {
                text: post.text,
                media,
                clan,
            };
            const res = await makePost(body);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error(error.response);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const { data } = await deletePost(postId);
            console.log(data);
        } catch (error) {
            console.error(error.response);
        }
    };

    return {
        handleNewPost,
        handleDeletePost,
    };
};
