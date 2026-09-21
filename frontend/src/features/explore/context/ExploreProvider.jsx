import { createContext, useContext, useEffect, useState } from "react";
import { INTEREST_DOMAINS } from "../../../config/interestDomains";
import { upsertClans } from "../../clans/helpers/updateClanEntities";
import { useSetEntities } from "../../global/EntityProvider";
import { getExploreSections } from "../apis/exploreApis";

const ExploreContext = createContext(null);

export const ExploreProvider = ({ children }) => {
    const [results, setResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [loadingExplore, setLoadingExplore] = useState(false);

    const [clansByDomain, setClansByDomain] = useState(
        Object.fromEntries(INTEREST_DOMAINS.map(({ name }) => [name, []]))
    );
    const { setEntities } = useSetEntities();

    useEffect(() => {
        const fetchClansByCategory = async () => {
            try {
                setLoadingExplore(true);
                const { data } = await getExploreSections();

                setEntities((prev) => upsertClans(data, prev));

                setClansByDomain((prev) => {
                    const map = { ...prev };

                    data.forEach((clan) => {
                        map[clan.domain] = [
                            ...new Set([...(map[clan.domain] || []), clan._id]),
                        ];
                    });

                    return map;
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingExplore(false);
            }
        };

        fetchClansByCategory();
    }, []);

    return (
        <ExploreContext.Provider
            value={{
                results,
                setResults,
                searching,
                setSearching,
                clansByDomain,
                loadingExplore,
            }}
        >
            {children}
        </ExploreContext.Provider>
    );
};

export const useExplore = () => useContext(ExploreContext);
