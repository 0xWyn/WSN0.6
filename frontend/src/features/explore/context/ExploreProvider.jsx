import { createContext, useContext, useState } from "react";

const ExploreContext = createContext(null);

export const ExploreProvider = ({ children }) => {
    const [results, setResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [showPrivateGate, setShowPrivateGate] = useState(null);

    return (
        <ExploreContext.Provider
            value={{
                results,
                setResults,
                searching,
                setSearching,
                showPrivateGate,
                setShowPrivateGate,
            }}
        >
            {children}
        </ExploreContext.Provider>
    );
};

export const useExplore = () => useContext(ExploreContext);
