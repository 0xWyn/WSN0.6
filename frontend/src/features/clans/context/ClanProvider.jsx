import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useSetEntities } from "../../global/EntityProvider";
import { getMyClans, getMyRequestedClans } from "../api/clanApis";

const ClanContext = createContext(null);

export const ClanProvider = ({ children }) => {
    const user = useCurrentUser();
    const userId = user?._id;

    const [activeClan, setActiveClan] = useState(null);
    const [myClanIds, setMyClanIds] = useState(null);
    const [requestedIds, setRequestedIds] = useState([]);

    const [loadingClans, setLoadingClans] = useState({
        activeClan: false,
        myClans: false,
    });

    const [showClanModal, setShowClanModal] = useState(false);
    const [showPrivateGate, setShowPrivateGate] = useState(false);

    const { setEntities } = useSetEntities();

    const authoredClans = [];

    useEffect(() => {
        if (!userId) {
            setMyClanIds(null);
            setRequestedIds([]);
            setActiveClan(null);
            return;
        }

        const fetchClans = async () => {
            try {
                setLoadingClans((prev) => ({ ...prev, myClans: true }));
                const { data } = await getMyClans();

                const map = {};

                data.forEach((clan) => {
                    map[clan._id] = clan;

                    if ((clan.founder || clan.founder._id) === userId) {
                        authoredClans.push(clan);
                    }
                });

                // clan queries
                const myIds = data.map((clan) => clan._id);

                setMyClanIds(myIds);

                setEntities((prev) => ({
                    ...prev,
                    clans: { ...(prev.clans || {}), ...map },
                }));
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingClans((prev) => ({ ...prev, myClans: false }));
            }
        };

        const getRequestedClans = async () => {
            try {
                setLoadingClans((prev) => ({ ...prev, myClans: true }));

                const { data } = await getMyRequestedClans();

                const map = {};
                data.map((clan) => {
                    map[clan._id] = clan;
                });

                setEntities((prev) => ({
                    ...prev,
                    clans: { ...prev.clans, ...map },
                }));

                const ids = data.map((clan) => clan._id);

                setRequestedIds(ids);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingClans((prev) => ({ ...prev, myClans: false }));
            }
        };

        fetchClans();
        getRequestedClans();
    }, [userId]);

    return (
        <ClanContext.Provider
            value={{
                myClanIds,
                loadingClans,
                setLoadingClans,
                showClanModal,
                setShowClanModal,
                authoredClans,
                requestedIds,
                activeClan,
                setActiveClan,
                setMyClanIds,
                showPrivateGate,
                setShowPrivateGate,
            }}
        >
            {children}
        </ClanContext.Provider>
    );
};

export const useClan = () => useContext(ClanContext);
