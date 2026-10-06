import { createContext, useContext, useState } from "react";

const ClanContext = createContext(null);
const ActiveClanContext = createContext(null);

export const ClanProvider = ({ children }) => {
    const [activeClan, setActiveClan] = useState(null);

    // Modals
    const [showClanModal, setShowClanModal] = useState(false);
    const [showPrivateGate, setShowPrivateGate] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    // Loading
    const [loadingClans, setLoadingClans] = useState({
        activeClan: true,
    });

    return (
        <ClanContext.Provider
            value={{
                loadingClans,
                setLoadingClans,
                showClanModal,
                setShowClanModal,
                activeClan,
                setActiveClan,
                showPrivateGate,
                setShowPrivateGate,
                showExitModal,
                setShowExitModal,
            }}
        >
            <ActiveClanContext.Provider value={activeClan}>
                {children}
            </ActiveClanContext.Provider>
        </ClanContext.Provider>
    );
};

export const useClan = () => useContext(ClanContext);
export const useActiveClan = () => useContext(ActiveClanContext);
