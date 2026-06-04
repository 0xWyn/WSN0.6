import { useEffect } from "react";
import { useSocket } from "../../socket/SocketProvider";
import { useEntities } from "../../global/EntityProvider";
import { useEntityActions } from "../../global/useEntityActions";
import { useAuth } from "../../auth/context/AuthProvider";

export const useUserSocket = () => {
    const { socket } = useSocket();
    const { user: auth } = useAuth();
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
