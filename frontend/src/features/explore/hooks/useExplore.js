import { useEffect, useState } from "react";
import { useClan } from "../../clans/context/ClanProvider";
import { getCategoryClans, getExploreSections } from "../apis/exploreApis";
import { INTEREST_DOMAINS } from "../../../config/interestDomains";
import { useEntities } from "../../global/EntityProvider";

export const useExploreLogic = () => {
    const { setClansByCategory, setLoadingClans } = useClan();

    const { setEntities, entities } = useEntities();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingClans((prev) => ({ ...prev, categories: true }));
                const { data } = await getExploreSections();

                const map = {};

                data.forEach((clan) => (map[clan._id] = clan));

                setEntities((prev) => ({
                    ...prev,
                    clans: { ...(prev.clans || {}), ...map },
                }));

                setClansByCategory(() => {
                    const map = Object.fromEntries(
                        INTEREST_DOMAINS.map(({ name }) => [name, []])
                    );

                    data.forEach((clan) => {
                        map[clan.domain]?.push(clan._id);
                    });

                    return map;
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingClans((prev) => ({ ...prev, categories: false }));
            }
        };

        fetchCategories();
    }, []);

    const viewCategory = async (category) => {
        try {
            const { data } = await getCategoryClans(category);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return { viewCategory };
};
