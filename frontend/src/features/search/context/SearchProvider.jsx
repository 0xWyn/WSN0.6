import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState(null);
    const [loadingSearch, setLoadingSearch] = useState(false);
    return (
        <SearchContext.Provider
            value={{ results, setResults, loadingSearch, setLoadingSearch }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
