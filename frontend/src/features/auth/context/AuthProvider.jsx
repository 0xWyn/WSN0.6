import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthLogic } from "../hooks/useAuthLogic";
import { useEntities } from "../../global/EntityProvider";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setEntities } = useEntities();

    const [authId, setAuthId] = useState(null);
    const [loading, setLoading] = useState(true);

    const { register, login, logout, fetchUser } = useAuthLogic(
        setAuthId,
        setLoading,
        setEntities,
        navigate,
        location
    );

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ authId, setAuthId, register, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
