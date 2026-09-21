import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEntities, useSetEntities } from "../../global/EntityProvider";
import { useAuthLogic } from "../hooks/useAuthLogic";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { entities } = useEntities();
    const { setEntities } = useSetEntities();

    const [authId, setAuthId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { register, login, logout, fetchUser } = useAuthLogic(
        setAuthId,
        setCurrentUser,
        setLoading,
        setEntities,
        navigate,
        location
    );

    useEffect(() => {
        if (!authId) {
            setCurrentUser(null);
            return;
        }

        const nextUser = entities.users[authId] ?? null;
        setCurrentUser((prev) => {
            if (prev?._id === nextUser?._id) return prev;
            return nextUser;
        });
    }, [authId, entities.users]);

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authId,
                currentUser,
                setAuthId,
                register,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
