import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useEntities } from "../../global/EntityProvider";
import { getMyClans } from "../api/clanApis";

const ClanContext = createContext(null);

export const ClanProvider = ({ children }) => {
    const user = useCurrentUser();
    const userId = user?._id;

    const { entities, setEntities } = useEntities();

    const [clansByCategory, setClansByCategory] = useState({});

    const [myClanIds, setMyClanIds] = useState([]);
    const [requestedClans, setRequestedClans] = useState([]);

    const [loadingClans, setLoadingClans] = useState({
        activeClan: false,
        categories: false,
        myClans: false,
    });

    const [showClanModal, setShowClanModal] = useState(false);

    const authoredClans = myClanIds?.map((id) =>
        entities?.clans?.[id]?.owner === user?._id ? entities.clans[id] : null
    );

    const [activeClan, setActiveClan] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const fetchClans = async () => {
            try {
                setLoadingClans((prev) => ({ ...prev, myClans: true }));
                const { data } = await getMyClans();

                const map = {};

                data.forEach((clan) => {
                    map[clan._id] = clan;
                });

                // clan queries
                const myIds = data
                    .filter((clan) => clan.members.includes(userId))
                    .map((clan) => clan._id);
                const requestedIds = data
                    .filter((clan) => clan.joinRequests.includes(userId))
                    .map((clan) => clan._id);

                setMyClanIds(myIds);
                setRequestedClans(requestedIds);

                setEntities((prev) => ({
                    ...prev,
                    clans: { ...(prev.clans || {}), ...map },
                }));

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
                setLoadingClans((prev) => ({ ...prev, myClans: false }));
            }
        };

        fetchClans();
    }, [userId]);

    useEffect(() => {
        return () => {
            setMyClanIds([]);
        };
    }, []);

    return (
        <ClanContext.Provider
            value={{
                myClanIds,
                loadingClans,
                setLoadingClans,
                showClanModal,
                setShowClanModal,
                clansByCategory,
                setClansByCategory,
                authoredClans,
                requestedClans,
                activeClan,
                setActiveClan,
            }}
        >
            {children}
        </ClanContext.Provider>
    );
};

export const useClan = () => useContext(ClanContext);
