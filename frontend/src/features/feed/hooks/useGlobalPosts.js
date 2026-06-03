import { useEffect } from "react";
import { useEntities } from "../../global/EntityProvider";
import { useFeed } from "../context/FeedProvider";
import { useFeedPosts } from "./useFeedPosts";

export const useGlobalPosts = () => {
    const { queries } = useFeed();
    const { entities } = useEntities();
    const { fetchGlobalPosts } = useFeedPosts();

    useEffect(() => {
        fetchGlobalPosts(1);
    }, []);

    const ids = queries.homeFeedIds;

    const posts = ids?.map((id) => entities.posts[id]) ?? [];

    return posts;
};
