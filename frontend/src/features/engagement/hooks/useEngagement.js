import { mergePosts } from "../../feed/utils/mergeEntities";
import { useSetEntities } from "../../global/EntityProvider";
import {
    deleteCommentLike,
    putCommentLike,
} from "../../post/comments/apis/commentApis";
import { addPostLike, removePostLike } from "../../post/main/apis/postApis";

export const useEngagement = (type, id) => {
    const { setEntities } = useSetEntities();

    const likePost = async () => {
        try {
            const { msg, post } = await addPostLike(id);

            console.log(msg);
            setEntities((prev) => ({
                ...prev,
                posts: mergePosts(prev.posts, [post]),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const unlikePost = async () => {
        try {
            const { msg, post } = await removePostLike(id);

            console.log(msg);
            setEntities((prev) => ({
                ...prev,
                posts: mergePosts(prev.posts, [post]),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const likeComment = async () => {
        try {
            const { msg, updatedComment } = await putCommentLike(id);

            console.log(msg);
            setEntities((prev) => ({
                ...prev,
                comments: mergePosts(prev.comments, [updatedComment]),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const unlikeComment = async () => {
        try {
            const { msg, updatedComment } = await deleteCommentLike(id);

            console.log(msg);
            setEntities((prev) => ({
                ...prev,
                comments: mergePosts(prev.comments, [updatedComment]),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const actions = {
        Post: { like: likePost, unlike: unlikePost },
        Comment: { like: likeComment, unlike: unlikeComment },
    };

    return actions[type] ?? {};
};
