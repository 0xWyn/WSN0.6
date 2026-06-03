import { useEntities } from "../../global/EntityProvider";
import { useFeed } from "../context/FeedProvider";

export const useFeedSelector = () => {
    const { queries } = useFeed();
    const { entities } = useEntities();

    const useUserPosts = (userId) => {
        const ids = queries.usersPostsIds[userId];

        const posts = ids?.map((id) => entities.posts[id]);

        return posts;
    };

    const useGlobalPosts = () => {
        const ids = queries.homeFeedIds;

        const posts = ids.map((id) => entities.posts[id]);

        return posts;
    };

    return { useUserPosts, useGlobalPosts };
};
