import { useFeed } from "../context/FeedProvider";

export const useQueryActions = () => {
    const { setQueries } = useFeed();

    const addClanPost = (newPostId, clanId) => {
        setQueries((prev) => ({
            ...prev,
            clanPostsIds: {
                ...prev.clanPostsIds,

                [clanId]: [
                    ...new Set([
                        newPostId,
                        ...(prev.clanPostsIds[clanId] ?? []),
                    ]),
                ],
            },
        }));
    };

    const removeClanPost = (postId, clanId) => {
        setQueries((prev) => ({
            ...prev,
            clanPostsIds: {
                ...prev.clanPostsIds,
                [clanId]: (prev.clanPostsIds[clanId] || []).filter(
                    (id) => id !== postId
                ),
            },
        }));
    };

    return { addClanPost, removeClanPost };
};
