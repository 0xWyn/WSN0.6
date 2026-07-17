import { useEffect } from "react";
import { useClan } from "../../clans/context/ClanProvider";
import { getCategoryClans, getExploreSections } from "../apis/exploreApis";
import { INTEREST_DOMAINS } from "../../../config/interestDomains";

export const useExplore = () => {
    const {
        setExploreCategories,
        setClansByCategory,
        setClanEntities,
        setLoading,
    } = useClan();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data } = await getExploreSections();

                setClanEntities((prev) => {
                    const map = { ...prev };

                    data.forEach((clan) => (map[clan._id] = clan));

                    return map;
                });

                setClansByCategory(() => {
                    const map = Object.fromEntries(
                        INTEREST_DOMAINS.map(({ name }) => [name, []])
                    );

                    data.forEach((clan) => {
                        map[clan.domain]?.push(clan._id);
                    });

                    console.log(map);

                    return map;
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
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
