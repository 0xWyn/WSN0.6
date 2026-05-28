import { useFeed } from "../context/FeedProvider";
import { getPosts, getUserPosts } from "../api/feedApis";
import { useEntityActions } from "../../global/useEntityActions";
import { useEntities } from "../../global/EntityProvider";

export const useFeedPosts = () => {
    const { setLoading } = useFeed();
    const { entities, setEntities } = useEntities();
    const { setQueries } = useFeed();
    const { mergePosts } = useEntityActions();

    const fetchGlobalPosts = async (page = 1) => {
        try {
            const { data } = await getPosts(page);

            mergePosts(data);

            const newIds = data.map((post) => post._id);

            setQueries((prev) => ({
                ...prev,
                homeFeedIds: [...new Set([...prev.homeFeedIds, ...newIds])],
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPosts = async (userId, page = 1) => {
        try {
            const { data } = await getUserPosts(userId, page);

            mergePosts(data);

            const ids = data.map((post) => post._id);
            setQueries((prev) => ({
                ...prev,

                usersPostsIds: {
                    ...prev.usersPostsIds,

                    [userId]: [
                        ...new Set([
                            ...(prev.usersPostsIds[userId] || []),
                            ...ids,
                        ]),
                    ],
                },
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSinglePost = async (postId) => {
        try {
            let post = entities.posts[postId];

            if (!post) {
                const { data } = await fetchPost(postId);
                mergePosts([data]);
                post = data;
            }
            return post;
        } catch (error) {
            console.error(error.response);
        }
    };

    return { fetchGlobalPosts, fetchUserPosts, fetchSinglePost };
};
