import { useEffect } from "react";
import { useEntityActions } from "../hooks/useEntityActions";
import { useSocket } from "../../socket/SocketProvider";

export const useFeedSocket = () => {
    const { updatePost } = useEntityActions();
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        const handleUpdatedPost = (post) => {
            updatePost(post);
            console.log("Updated post");
        };

        socket.on("updated_post", handleUpdatedPost);

        return () => {
            socket.off("updated_post", handleUpdatedPost);
        };
    }, [socket]);
};
