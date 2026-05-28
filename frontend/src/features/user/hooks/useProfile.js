import { useEffect, useState } from "react";
import { getUser } from "../apis/userApis";
import { useEntityActions } from "../../global/useEntityActions";
import { useEntities } from "../../global/EntityProvider";

export const useProfile = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { mergeUsers } = useEntityActions();

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const { data } = await getUser(userId);
                setUser(data);
                console.log(data);
                mergeUsers([data]);
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, loading, error };
};
