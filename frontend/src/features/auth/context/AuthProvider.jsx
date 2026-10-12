import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyClans } from "../../clans/api/clanApis";
import { upsertClans } from "../../clans/helpers/updateClanEntities";
import { useSetEntities } from "../../global/EntityProvider";
import { getMe } from "../apis/authApis";
import { useAuthLogic } from "../hooks/useAuthLogic";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { setEntities, setMyClanIds } = useSetEntities();

    const [currentUser, setCurrentUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const { register, login, logout } = useAuthLogic(
        setCurrentUser,
        setLoadingAuth,
        setEntities,
        setMyClanIds,
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

    useEffect(() => {
        if (!currentUser) return;
        const fetchClans = async () => {
            try {
                setLoadingAuth(true);
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

        fetchClans();
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
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
