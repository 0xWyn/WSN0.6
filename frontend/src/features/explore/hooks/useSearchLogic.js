import { useEffect } from "react";
import { getClans, searchExplore } from "../apis/searchApis";
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

    const handleSearchExplore = async (query) => {
        try {
            setResults(null);
            setSearching(true);
            const { data } = await searchExplore(query);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    return { handleClanDirectorySearch, handleSearchExplore };
};
