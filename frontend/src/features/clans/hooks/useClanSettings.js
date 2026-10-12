import { useState } from "react";
import { useEntityActions } from "../../global/useEntityActions";
import {
    acceptRequest,
    getClanLeaders,
    getClanRequests,
    getMembers,
    rejectRequest,
    toggleClanDelete,
} from "../api/clanApis";
import { useClanManagement } from "../context/ClanManagementProvider";
import { upsertMembers } from "../helpers/upsertMembers";

export const useClanSettings = (clanId) => {
    const { mergeUsers } = useEntityActions();
    const { setMembers, setHasMore, setRequests, setLeaders } =
        useClanManagement();

    const [loadingClanSettings, setLoadingClanSettings] = useState({
        fetchMembers: true,
        fetchLeaders: false,
        fetchRequests: true,
        handleRequests: true,
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

    const handleAcceptRequest = async (reqId) => {
        try {
            setLoadingClanSettings((prev) => ({
                ...prev,
                handleRequest: true,
            }));

            const { data } = await acceptRequest(clanId, reqId);
            console.log(data.msg);
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
            setRequests((prev) => prev.filter((r) => r._id !== reqId));
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

    return {
        fetchClanMembers,
        fetchClanRequests,
        fetchClanLeaders,
        loadingClanSettings,
        handleAcceptRequest,
        handleRejectRequest,
        handleClanDeletion,
    };
};
