import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [results, setResults] = useState(null);
    const [searching, setSearching] = useState(false);
    return (
        <SearchContext.Provider
            value={{ results, setResults, searching, setSearching }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
