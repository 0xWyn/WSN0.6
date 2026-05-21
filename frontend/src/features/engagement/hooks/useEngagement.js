import { togglePostLike, toggleCommentLike } from "../apis/engagementApis";

export const useEngagement = (valueId, type) => {
    const like = async () => {
        try {
            const { data } =
                type === "post"
                    ? await togglePostLike(valueId)
                    : await toggleCommentLike(valueId);
            console.log(data);
        } catch (error) {
            console.error(error.response);
        }
    };

    return { like };
};
