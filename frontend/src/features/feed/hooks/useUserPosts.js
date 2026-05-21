import { getUserPosts } from "../api/feedApis";
import { useEntityActions } from "./useEntityActions";

export const useUserPosts = () => {
    const { insertPosts } = useEntityActions();

    const fetchUserPosts = async (userId) => {
        try {
            const { data } = await getUserPosts(userId);

            insertPosts(data, {
                type: "user",
                userId,
            });
        } catch (error) {
            console.error(error.response ?? error);
        }
    };

    return { fetchUserPosts };
};
