import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthLogic } from "../hooks/useAuthLogic";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { register, login, fetchUser, logout } = useAuthLogic(
        setUser,
        setLoading,
        navigate,
        location
    );

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const handleLogout = () => {
            setUser(null);
        };

        window.addEventListener("auth:logout", handleLogout);

        return () => window.removeEventListener("auth:logout", handleLogout);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, register, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
