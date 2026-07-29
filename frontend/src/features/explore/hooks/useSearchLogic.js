import { useEffect } from "react";
import { getClans } from "../apis/searchApis";
import { useExplore } from "../context/ExploreProvider";

export const useSearchLogic = () => {
    const { setResults, setSearching } = useExplore();

    const handleClanDirectorySearch = async (term) => {
        try {
            setResults(null);
            setSearching(true);
            const { data } = await getClans(term);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    return { handleClanDirectorySearch };
};
