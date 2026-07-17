import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/uploadToCloud";
import { createClan } from "../api/clanApis";

export const useClanActions = () => {
    const [creatingClan, setCreatingClan] = useState(false);

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

    return {
        handleCreateClan,
        creatingClan,
        handleDeleteClan,
    };
};
