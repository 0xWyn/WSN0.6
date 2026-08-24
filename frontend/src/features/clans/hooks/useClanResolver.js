import { useEffect } from "react";
import { useClan } from "../context/ClanProvider";
import { useEntities } from "../../global/EntityProvider";
import { getClanById } from "../api/clanApis";

export const useClanResolver = (id) => {
    const { setActiveClan, setLoadingClans } = useClan();
    const { entities } = useEntities();

    useEffect(() => {
        if (!id) return;
        const fetchClan = async () => {
            try {
                setLoadingClans((prev) => ({ ...prev, activeClan: true }));
                const clan = entities?.clans?.[id];

                if (!clan) {
                    const { data } = await getClanById(id);
                    setActiveClan(data);
                    return;
                }

                setActiveClan(clan);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingClans((prev) => ({ ...prev, activeClan: false }));
            }
        };

        fetchClan();
    }, [id]);
};
