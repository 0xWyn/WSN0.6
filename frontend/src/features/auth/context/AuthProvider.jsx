import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEntities, useSetEntities } from "../../global/EntityProvider";
import { useAuthLogic } from "../hooks/useAuthLogic";
import { getMe } from "../apis/authApis";
import { upsertClans } from "../../clans/helpers/updateClanEntities";
import { getMyClans } from "../../clans/api/clanApis";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setEntities, setMyClanIds } = useSetEntities();

    const [authId, setAuthId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const { register, login, logout } = useAuthLogic(
        setAuthId,
        setCurrentUser,
        setLoadingAuth,
        setEntities,
        navigate,
        location
    );

    useEffect(() => {
        const fetchAuth = async () => {
            console.log("FETCHING USER");

            try {
                const {
                    data: { user },
                } = await getMe();

                setCurrentUser(user);

                const { data } = await getMyClans();
                const myIds = data
                    .filter((clan) => clan.role)
                    .map((clan) => clan._id);

                setMyClanIds(myIds);

                setEntities((prev) => upsertClans(data, prev));
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingAuth(false);
            }
        };

        fetchAuth();
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
                loadingAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
