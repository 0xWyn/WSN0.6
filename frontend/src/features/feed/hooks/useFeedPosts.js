import { useFeed } from "../context/FeedProvider";
import { getPosts, getUserPosts } from "../api/feedApis";
import { useEntityActions } from "./useEntityActions";

export const useFeedPosts = () => {
    const { setLoading } = useFeed();
    const { insertPosts } = useEntityActions();

    const fetchGlobalPosts = async (page = 1) => {
        try {
            const { data } = await getPosts(page);

            insertPosts(data, {
                type: "home",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async (userId, page = 1) => {
        try {
            const { data } = await getUserPosts(userId, page);
            insertPosts(data, {
                type: "user",
                userId: userId,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSinglePost = async (postId) => {
        try {
            const { data } = await fetchPost(postId);
            return data;
        } catch (error) {
            console.error(error.response);
        }
    };

    return { fetchGlobalPosts, fetchUserPosts, fetchSinglePost };
};
