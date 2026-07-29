import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthProvider";
import { getMyClans } from "../api/clanApis";

const ClanContext = createContext(null);

export const ClanProvider = ({ children }) => {
    const { user } = useAuth();

    const [clanEntities, setClanEntities] = useState({});
    const [clansByCategory, setClansByCategory] = useState({});
    const [exploreCategories, setExploreCategories] = useState([]);

    const [myClanIds, setMyClanIds] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showClanModal, setShowClanModal] = useState(false);

    const authoredClans = myClanIds.map((id) =>
        clanEntities[id].owner === user._id ? clanEntities[id] : null
    );

    const [requested, setRequested] = useState({});
    useEffect(() => {
        if (!user) return;

        const fetchClans = async () => {
            try {
                setLoading(true);
                const { data } = await getMyClans();

                const map = {};

                data.forEach((clan) => {
                    map[clan._id] = clan;
                });

                const ids = data.map((clan) => clan._id);

                setMyClanIds(ids);
                setClanEntities((prev) => ({ ...(prev || {}), ...map }));

                setClansByCategory((prev) => {
                    const map = { ...prev };
                    data.forEach((clan) => {
                        map[clan?.category] = [
                            ...new Set([
                                ...(prev[clan?.category] || []),
                                clan._id,
                            ]),
                        ];
                    });
                    return map;
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClans();
    }, [user]);

    return (
        <ClanContext.Provider
            value={{
                clanEntities,
                setClanEntities,
                myClanIds,
                loading,
                setLoading,
                showClanModal,
                setShowClanModal,
                exploreCategories,
                clansByCategory,
                setExploreCategories,
                setClansByCategory,
                authoredClans,
            }}
        >
            {children}
        </ClanContext.Provider>
    );
};

export const useClan = () => useContext(ClanContext);
