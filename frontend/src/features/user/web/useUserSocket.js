import { useEffect } from "react";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useEntityActions } from "../../global/useEntityActions";
import { useSocket } from "../../socket/SocketProvider";

export const useUserSocket = () => {
    const { socket } = useSocket();
    const auth = useCurrentUser();
    const { mergeUsers } = useEntityActions();

    useEffect(() => {
        if (!socket) return;

        const handleFollowUpdate = (data) => {
            const update = data.map((user) => {
                if (user._id !== auth._id) {
                    const isFollowing = true;
                    return { ...user, isFollowing };
                } else {
                    return user;
                }
            });
            console.log("FOLLOWED:", update);
            mergeUsers(update);
        };

        const handleUnfollowUpdate = (data) => {
            const update = data.map((user) => {
                if (user._id !== auth._id) {
                    const isFollowing = false;
                    return { ...user, isFollowing };
                } else {
                    return user;
                }
            });
            console.log("UNFOLLOWED:", update);
            mergeUsers(update);
        };

        socket.on("user_follow_update", handleFollowUpdate);
        socket.on("user_unfollow_update", handleUnfollowUpdate);

        return () => {
            socket.off("user_follow_update", handleFollowUpdate);
            socket.off("user_unfollow_update", handleUnfollowUpdate);
        };
    }, [socket]);
};
