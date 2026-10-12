import API from "../../../utils/axiosInterceptor";

export const useAuthLogic = (
    setCurrentUser,
    setLoadingAuth,
    setEntities,
    setMyClanIds,
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
            setLoadingAuth(true);
            const { data: user } = await API.post("auth/login", credentials);
            setCurrentUser(user);
            navigate(from);
        } catch (error) {
            console.error(error.response);
        } finally {
            setLoadingAuth(false);
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
            setMyClanIds([]);
            navigate("/login");
        }
    };

    return { register, login, logout };
};
