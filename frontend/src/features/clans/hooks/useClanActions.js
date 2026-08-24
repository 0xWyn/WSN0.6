import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/uploadToCloud";
import {
    acceptRequest,
    createClan,
    joinClan,
    rejectRequest,
} from "../api/clanApis";

export const useClanActions = (clanId) => {
    const [creatingClan, setCreatingClan] = useState(false);
    const [loadingClanActions, setLoadingClanActions] = useState({
        handleRequest: false,
        create: false,
        delete: false,
        join: false,
    });

    const handleCreateClan = async (details) => {
        try {
            setCreatingClan(true);
            const { name, description, domain, tags, visibility } = details;
            const avatar = details.avatar
                ? await uploadToCloudinary(details?.avatar, {
                      folder: "clans",
                  })
                : null;

            const banner = details.banner
                ? await uploadToCloudinary(details?.banner, {
                      folder: "clans",
                  })
                : null;

            const body = {
                avatar,
                banner,
                name,
                description,
                domain,
                tags,
                visibility,
            };

            const res = await createClan(body);

            return res.data;
        } catch (error) {
            console.error(error);
        } finally {
            setCreatingClan(false);
        }
    };

    const handleDeleteClan = async () => {
        try {
        } catch (error) {
            console.error(error.response);
        }
    };

    const handleJoinClan = async () => {
        try {
            const { data } = await joinClan(clanId);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAcceptRequest = async (memberId) => {
        try {
            setLoadingClanActions((prev) => ({ ...prev, handleRequest: true }));
            const { data } = await acceptRequest(clanId, memberId);

            console.log(data.msg);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingClanActions((prev) => ({
                ...prev,
                handleRequest: false,
            }));
        }
    };

    const handleRejectRequest = async (memberId) => {
        try {
            setLoadingClanActions((prev) => ({ ...prev, handleRequest: true }));

            const { data } = await rejectRequest(clanId, memberId);

            console.log(data.msg);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingClanActions((prev) => ({
                ...prev,
                handleRequest: false,
            }));
        }
    };

    const fetchClanMembers = async (page = 1) => {
        try {
        } catch (error) {}
    };

    return {
        handleCreateClan,
        creatingClan,
        handleDeleteClan,
        handleJoinClan,
        handleAcceptRequest,
        handleRejectRequest,
        loadingClanActions,
    };
};
