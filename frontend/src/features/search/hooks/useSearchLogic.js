import { useEffect } from "react";
import { getClans } from "../apis/searchApis";
import { useSearch } from "../context/SearchProvider";

export const useSearchLogic = () => {
    const { setResults, setLoadingSearch } = useSearch();

    const handleClanDirectorySearch = async (term) => {
        try {
            setLoadingSearch(true);
            const { data } = await getClans(term);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingSearch("completed");
        }
    };

    return { handleClanDirectorySearch };
};
