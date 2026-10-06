import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/uploadToCloud";
import { useSetEntities } from "../../global/EntityProvider";
import {
    cancelRequest,
    createClan,
    joinClan,
    leaveClan,
} from "../api/clanApis";
import { useClan } from "../context/ClanProvider";

export const useClanActions = (clanId) => {
    const [loadingClanActions, setLoadingClanActions] = useState({
        create: true,
        join: true,
    });

    const handleCreateClan = async (details) => {
        try {
            setLoadingClanActions((prev) => ({ ...prev, create: true }));
            const { name, description, domain, tags, access } = details;
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
                access,
            };

            const res = await createClan(body);

            return res.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingClanActions((prev) => ({ ...prev, create: false }));
        }
    };

    const handleJoinClan = async () => {
        try {
            const { data } = await joinClan(clanId);
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleLeaveClan = async () => {
        try {
            const { data } = await leaveClan(clanId);
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleCancelRequest = async () => {
        try {
            const { data } = await cancelRequest(clanId);
            console.log(data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return {
        handleCreateClan,
        handleJoinClan,
        loadingClanActions,
        handleCancelRequest,
        handleLeaveClan,
    };
};
