import { useState } from "react";
import { uploadIfFile } from "../../../helper/uploadIfFile";
import { patchProfile, toggleFollow } from "../apis/userApis";
import { useUpdateUser } from "./useUpdateUser";

export const useUserActions = () => {
    const { updateUser } = useUpdateUser();
    const [loading, setLoading] = useState({
        editProfile: false,
        followUser: false,
    });

    const editProfile = async (data) => {
        try {
            setLoading((prev) => ({ ...prev, editProfile: true }));
            const form = {
                ...data,
                avatar: await uploadIfFile(data.avatar, "user"),
                cover: await uploadIfFile(data.cover, "user"),
            };

            const response = await patchProfile(form);

            updateUser(response.data.user);
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, editProfile: false }));
        }
    };

    const followUser = async () => {
        try {
            const { data } = await toggleFollow(userId);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return { followUser, editProfile, loading };
};
