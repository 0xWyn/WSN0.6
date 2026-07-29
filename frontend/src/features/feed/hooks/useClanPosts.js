import { useEffect } from "react";
import { useEntities } from "../../global/EntityProvider";
import { useFeed } from "../context/FeedProvider";
import { useFeedPosts } from "./useFeedPosts";

export const useClanPosts = (id) => {
    const { queries } = useFeed();
    const { entities } = useEntities();
    const { fetchClanPosts } = useFeedPosts();

    useEffect(() => {
        fetchClanPosts(1, id);
    }, [id]);

    const ids = queries.clanPostsIds[id];

    const posts = ids?.map((id) => entities.posts[id]) ?? [];

    return posts;
};
