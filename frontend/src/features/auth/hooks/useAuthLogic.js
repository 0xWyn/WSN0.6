import API from "../../../utils/axiosInterceptor";

export const useAuthLogic = (
    setAuthId,
    setCurrentUser,
    setLoading,
    setEntities,
    navigate,
    location
) => {
    const from = location.state?.from?.pathname || "/";

    const upsertAuth = (user) => {
        setAuthId(user._id);
        setCurrentUser(user);

        setEntities((prev) => ({
            ...prev,
            users: { ...prev.users, [user._id]: user },
        }));
    };

    const register = async (credentials) => {
        try {
            const { data } = await API.post("auth/register", credentials);
            upsertAuth(data);
            navigate("/");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            const { data } = await API.post("auth/login", credentials);
            upsertAuth(data);
            navigate(from);
        } catch (error) {
            console.error(error.response);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await API.get("auth/idme");
            upsertAuth(res.data.user);
        } catch (error) {
            setAuthId(null);
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await API.post("auth/logout");
        } catch (error) {
            console.error(error);
        } finally {
            setEntities((prev) => ({
                ...prev,
                users: {},
                chats: {},
                messages: {},
                comments: {},
                posts: {},
                clans: {},
            }));
            setAuthId(null);
            setCurrentUser(null);
            navigate("/login");
        }
    };

    return { register, login, fetchUser, logout };
};
