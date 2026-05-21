import { toggleFollow } from "../apis/userApis";
export const useUserActions = (userId) => {
    const followUser = async () => {
        try {
            const { data } = await toggleFollow(userId);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return { followUser };
};
