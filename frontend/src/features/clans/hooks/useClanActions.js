import { uploadToCloudinary } from "../../../utils/uploadToCloud";
import { createClan } from "../api/clanApis";

export const useClanActions = () => {
    const handleCreateClan = async (clan) => {
        try {
            const { clanName, description, visibility } = clan;
            const avatar = clan.avatarFile
                ? await uploadToCloudinary(clan?.avatarFile, {
                      folder: "clans",
                  })
                : null;

            const body = {
                clanName,
                description,
                visibility,
                avatar,
            };

            const res = await createClan(body);

            return res.data;
        } catch (error) {
            console.error(error.response);
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
        handleDeleteClan,
    };
};
