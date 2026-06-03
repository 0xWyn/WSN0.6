import { useEffect, useState } from "react";
import { getUser } from "../apis/userApis";
import { useEntityActions } from "../../global/useEntityActions";
import { useEntities } from "../../global/EntityProvider";
import { useFeedPosts } from "../../feed/hooks/useFeedPosts";

export const useProfile = (userId) => {
    const { mergeUsers } = useEntityActions();
    const { fetchUserPosts } = useFeedPosts();
    const { entities } = useEntities();

    const user = entities.users[userId];

    useEffect(() => {
        if (!userId) return;

        if (!user?.__isFull) {
            getUser(userId)
                .then(({ data }) => mergeUsers([data]))
                .catch(console.error);
        }
    }, [userId, user?.__isFull]);

    return { loading: !user?.__isFull, user };
};
