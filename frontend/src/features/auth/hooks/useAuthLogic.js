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

    const register = async (credentials) => {
        try {
            const { data } = await API.post("auth/register", credentials);
            setCurrentUser(data);
            navigate("/");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            const { data } = await API.post("auth/login", credentials);
            setCurrentUser(data);
            navigate(from);
        } catch (error) {
            console.error(error.response);
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
            setCurrentUser(null);
            navigate("/login");
        }
    };

    return { register, login, logout };
};
