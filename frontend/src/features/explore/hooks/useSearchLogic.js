import { useEffect } from "react";
import { getClans } from "../apis/searchApis";
import { useSearch } from "../context/SearchProvider";

export const useSearchLogic = () => {
    const { setResults, setSearching } = useSearch();

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
