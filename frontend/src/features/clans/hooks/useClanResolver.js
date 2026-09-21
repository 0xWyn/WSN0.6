import { useEffect } from "react";
import { useClan } from "../context/ClanProvider";
import { useEntities } from "../../global/EntityProvider";
import { getClanById } from "../api/clanApis";

export const useClanResolver = (id) => {
    const { setActiveClan, setLoadingClans } = useClan();
    const { entities } = useEntities();

    useEffect(() => {
        if (!id) return;

        const resolveClan = async () => {
            try {
                const clan = entities?.clans?.[id];

                if (clan) {
                    setActiveClan(clan);
                    return;
                }

                setLoadingClans((prev) => ({ ...prev, activeClan: true }));

                const { data } = await getClanById(id);
                setActiveClan(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingClans((prev) => ({ ...prev, activeClan: false }));
            }
        };

        resolveClan();
    }, [id, entities]);
};
