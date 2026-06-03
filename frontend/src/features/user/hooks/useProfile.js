import { useEffect, useState } from "react";
import { getUser } from "../apis/userApis";
import { useEntityActions } from "../../global/useEntityActions";
import { useEntities } from "../../global/EntityProvider";
import { useFeedPosts } from "../../feed/hooks/useFeedPosts";

export const useProfile = (userId) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { mergeUsers } = useEntityActions();
    const { fetchUserPosts } = useFeedPosts();

    const fetchUser = async () => {
        try {
            const { data } = await getUser(userId);
            mergeUsers([data]);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const getData = async () => {
            try {
                await fetchUser();
                await fetchUserPosts(userId);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [userId]);

    return { loading, user };
};
