import { createContext, useContext, useEffect, useState } from "react";
import { getClans } from "../api/clanApi";
import { useAuth } from "../../auth/context/AuthProvider";

const ClanContext = createContext(null);

export const ClanProvider = ({ children }) => {
    const { user } = useAuth();
    const [clans, setClans] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchClans = async () => {
            try {
                setLoading(true);
                const { data } = await getClans();

                const map = {};

                data.forEach((clan) => {
                    map[clan._id] = clan;
                });
                setClans(map);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClans();
    }, [user]);

    return (
        <ClanContext.Provider value={{ clans, loading }}>
            {children}
        </ClanContext.Provider>
    );
};

export const useClan = () => useContext(ClanContext);
