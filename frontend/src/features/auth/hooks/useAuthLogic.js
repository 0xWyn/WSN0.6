import API from "../../../utils/axiosInterceptor";

export const useAuthLogic = (setUser, setLoading, navigate, location) => {
    const from = location.state?.from?.pathname || "/";

    const register = async (credentials) => {
        try {
            const { data } = await API.post("auth/register", credentials);
            setUser(data);
            navigate("/");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            const { data } = await API.post("auth/login", credentials);
            setUser(data);
            console.log(data);
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
            setUser(res.data.user);
            console.log(res.data.user);
        } catch (error) {
            console.error(error);
            setUser(null);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const { data } = await API.post("auth/logout");
            console.log(data);
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error(error);
            setUser(null);
            navigate("/login");
        }
    };

    return { register, login, fetchUser, logout };
};
