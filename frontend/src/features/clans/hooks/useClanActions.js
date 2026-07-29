import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/uploadToCloud";
import { createClan, joinClan, getClanById } from "../api/clanApis";
import { useClan } from "../context/ClanProvider";

export const useClanActions = () => {
    const [creatingClan, setCreatingClan] = useState(false);
    const [loadingClan, setLoadingClan] = useState(false);
    const { clanEntities } = useClan();

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

    const handleJoinClan = async (clanId) => {
        try {
            const { data } = await joinClan(clanId);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFetchClan = async (clanId) => {
        try {
            console.log("Here");
            setLoadingClan(true);
            let clan = clanEntities[clanId];
            if (!clan) {
                const { data } = await getClanById(clanId);
                clan = data;
            }
            return clan;
        } catch (error) {
            console.error(error);
        } finally {
            console.log("here");
            setLoadingClan(false);
        }
    };
    return {
        handleCreateClan,
        creatingClan,
        handleDeleteClan,
        handleJoinClan,
        handleFetchClan,
        loadingClan,
    };
};
