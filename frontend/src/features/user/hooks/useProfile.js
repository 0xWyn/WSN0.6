import { useEffect, useState } from "react";
import { getUser } from "../apis/userApis";
import { useEntityActions } from "../../feed/hooks/useEntityActions";

export const useProfile = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { updateUser } = useEntityActions();

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const { data } = await getUser(userId);
                setUser(data);
                updateUser(user);
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
