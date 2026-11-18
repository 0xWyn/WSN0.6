import { useState } from "react";
import { uploadIfFile } from "../../../helpers/uploadIfFile";
import {
    addFollow,
    fetchFollowers,
    fetchFollowing,
    patchProfile,
    removeFollow,
} from "../apis/userApis";
import { useUpdateUser } from "./useUpdateUser";
import { useEntityActions } from "../../global/useEntityActions";
import { useUser } from "../context/UserProvider";
import { mergeEntities } from "../../feed/utils/mergeEntities";

export const useUserActions = (userId) => {
    const { updateUser } = useUpdateUser();
    const [loading, setLoading] = useState({
        editProfile: false,
        followUser: false,
    });

    const { mergeUsers } = useEntityActions();

    const { setConnections, setLoadingUser } = useUser();

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
            const {
                data: { msg, userUpdate },
            } = await addFollow(userId);
            console.log(msg);
            mergeUsers([userUpdate]);
        } catch (error) {
            console.error(error);
        }
    };

    const unfollowUser = async () => {
        try {
            const {
                data: { msg, userUpdate },
            } = await removeFollow(userId);
            console.log(msg);
            mergeUsers([userUpdate]);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserFollowers = async () => {
        try {
            console.log("Fetching followers");
            const { data } = await fetchFollowers(userId);

            console.log(data);
            setConnections((prev) => ({
                ...prev,
                followers: mergeEntities(prev.followers, data),
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingUser((prev) => ({ ...prev, followers: false }));
        }
    };

    const fetchUserFollowing = async () => {
        try {
            const { data } = await fetchFollowing(userId);

            console.log(data);
            setConnections((prev) => ({
                ...prev,
                following: [...(prev.following || []), ...data],
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingUser((prev) => ({ ...prev, following: false }));
        }
    };

    return {
        followUser,
        unfollowUser,
        editProfile,
        loading,
        fetchUserFollowers,
        fetchUserFollowing,
    };
};
