import { createContext, useContext, useEffect, useState } from "react";
import { useClan } from "./ClanProvider";

const ClanManagementContext = createContext(null);

export const ClanManagementProvider = ({ children }) => {
    const [requests, setRequests] = useState([]);
    const [members, setMembers] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const [pendingOwnershipTransfer, setPendingOwnershipTransfer] =
        useState(null);
    const [clanTransferRequest, setClanTransferRequest] = useState(null);

    return (
        <ClanManagementContext.Provider
            value={{
                requests,
                setRequests,
                members,
                setMembers,
                hasMore,
                setHasMore,
                leaders,
                setLeaders,
                pendingOwnershipTransfer,
                setPendingOwnershipTransfer,
                clanTransferRequest,
                setClanTransferRequest,
            }}
        >
            {children}
        </ClanManagementContext.Provider>
    );
};

export const useClanManagement = () => useContext(ClanManagementContext);
