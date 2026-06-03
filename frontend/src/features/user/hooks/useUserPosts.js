import { useEffect } from "react";
import { useFeed } from "../../feed/context/FeedProvider";
import { useFeedPosts } from "../../feed/hooks/useFeedPosts";
import { useEntities } from "../../global/EntityProvider";

export const useUserPosts = (userId) => {
    const { queries } = useFeed();
    const { entities } = useEntities();
    const { fetchUserPosts } = useFeedPosts();

    const ids = queries.usersPostsIds?.[userId];

    useEffect(() => {
        if (!userId) return;

        if (!ids) {
            fetchUserPosts(userId);
        }
    }, [userId, ids]);

    const posts = ids?.map((id) => entities.posts[id]) ?? [];

    return posts;
};
