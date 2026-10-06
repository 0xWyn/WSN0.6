import { createContext, useContext, useEffect, useState } from "react";
import { useClan } from "./ClanProvider";

const ClanManagementContext = createContext(null);

export const ClanManagementProvider = ({ children }) => {
    const [requests, setRequests] = useState([]);
    const [members, setMembers] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    return (
        <ClanManagementContext.Provider
            value={{
                requests,
                setRequests,
                members,
                setMembers,
                hasMore,
                setHasMore,
            }}
        >
            {children}
        </ClanManagementContext.Provider>
    );
};

export const useClanManagement = () => useContext(ClanManagementContext);
