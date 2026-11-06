import { normalisePosts } from "../../feed/utils/normaliseEntities";
import { useSetEntities } from "../../global/EntityProvider";
import { togglePostLike, toggleCommentLike } from "../apis/engagementApis";

export const useEngagement = (valueId, type) => {
    const { setEntities } = useSetEntities();
    const like = async () => {
        try {
            const {
                data: { msg, post },
            } =
                type === "post"
                    ? await togglePostLike(valueId)
                    : await toggleCommentLike(valueId);
            console.log(post);
            setEntities((prev) => normalisePosts([post], prev));
        } catch (error) {
            console.error(error.response);
        }
    };

    return { like };
};
