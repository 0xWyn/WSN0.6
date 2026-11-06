import { useState } from "react";
import { useEntityActions } from "../../global/useEntityActions";
import {
    acceptJoinRequest,
    acceptOwnershipTransferRequest,
    getClanLeaders,
    getClanRequests,
    getMembers,
    getTransferRequest,
    rejectRequest,
    rejvokeOwnershipTransferRequest,
    toggleClanDelete,
} from "../api/clanApis";
import { useClanManagement } from "../context/ClanManagementProvider";
import { upsertMembers } from "../helpers/upsertMembers";

export const useClanSettings = (clanId) => {
    const { mergeUsers } = useEntityActions();
    const {
        setMembers,
        setHasMore,
        setRequests,
        setLeaders,
        setPendingOwnershipTransfer,
        setClanTransferRequest,
    } = useClanManagement();

    const [loadingClanSettings, setLoadingClanSettings] = useState({
        fetchMembers: true,
        fetchLeaders: false,
        fetchRequests: true,
        handleRequests: true,
        fetchPendingTransfer: true,
    });

    const fetchClanMembers = async (page) => {
        try {
            setLoadingClanSettings((p) => ({ ...p, fetchMembers: true }));
            const {
                data: { members, hasMore },
            } = await getMembers(clanId, page);

            setHasMore(hasMore);

            setMembers((prev) => upsertMembers(members, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingClanSettings((p) => ({ ...p, fetchMembers: false }));
        }
    };

    const fetchClanRequests = async () => {
        try {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchRequests: true,
            }));
            const { data } = await getClanRequests(clanId);

            const users = data.map(({ user }) => user);
            mergeUsers(users);

            const reqs = data.map(({ user, ...rest }) => ({
                ...rest,
                user: user._id,
            }));

            setRequests(reqs);
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchRequests: false,
            }));
        }
    };

    const fetchClanLeaders = async () => {
        try {
            setLoadingClanSettings((prev) => ({ ...prev, fetchLeaders: true }));
            const { data } = await getClanLeaders(clanId);
            const users = data.map(({ user }) => user);
            setLeaders((prev) => upsertMembers(users, prev));
        } catch (error) {
            console.error(error?.response?.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchLeaders: false,
            }));
        }
    };

    const checkReviewRequest = async () => {
        try {
        } catch (error) {}
    };

    const handleAcceptRequest = async (reqId) => {
        try {
            setLoadingClanSettings((prev) => ({
                ...prev,
                handleRequest: true,
            }));

            const { data } = await acceptJoinRequest(reqId);
            console.log(data);
            setRequests((prev) => prev.filter((r) => r._id !== reqId));
        } catch (error) {
            console.log(error?.response?.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                handleRequest: false,
            }));
        }
    };

    const handleRejectRequest = async (reqId) => {
        try {
            setLoadingClanSettings((prev) => ({
                ...prev,
                handleRequest: true,
            }));

            const { data } = await rejectRequest(clanId, reqId);

            console.log(data.msg);
        } catch (error) {
            console.error(error?.response?.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                handleRequest: false,
            }));
        }
    };

    const handleClanDeletion = async () => {
        try {
            const { data } = await toggleClanDelete(clanId);
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const fetchPendingTransfer = async (userId) => {
        try {
            const res = await getTransferRequest(clanId);
            if (res.status === 204) return;

            const { data } = res;

            if (data.targetUser._id === userId) {
                console.log("Is targetUser");
                setClanTransferRequest(data);
            } else if (data.clan.founder === userId) {
                console.log("Is acting user");
                setPendingOwnershipTransfer(data);
            } else {
                console.log("No valid credentials");

                return;
            }
        } catch (error) {
            console.error(error);
            console.log(error?.response?.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchPendingTransfer: false,
            }));
        }
    };

    const handleAcceptOwnershipTransfer = async (reqId) => {
        try {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchPendingTransfer: true,
            }));
            const { data } = await acceptOwnershipTransferRequest(reqId);
            console.log(data);

            setClanTransferRequest(null);
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchPendingTransfer: true,
            }));
        }
    };

    const handleRejvokeOwnershipTransfer = async (reqId) => {
        try {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchPendingTransfer: true,
            }));
            const { data } = await rejvokeOwnershipTransferRequest(reqId);
            console.log(data);

            setClanTransferRequest(null);
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoadingClanSettings((prev) => ({
                ...prev,
                fetchPendingTransfer: true,
            }));
        }
    };

    return {
        fetchClanMembers,
        fetchClanRequests,
        fetchClanLeaders,
        loadingClanSettings,
        handleAcceptRequest,
        handleRejectRequest,
        handleClanDeletion,
        fetchPendingTransfer,
        handleAcceptOwnershipTransfer,
        handleRejvokeOwnershipTransfer,
    };
};
