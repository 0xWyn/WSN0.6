import { useEffect } from "react";
import { useAuth } from "../../../auth/context/AuthProvider";

export const useCommentSocket = (setCommentIds, setCommentsById, postId) => {
    const { socket } = useAuth();
    useEffect(() => {
        if (!socket) return;

        const handleNewComment = (comment) => {
            if (comment.parentPost !== postId) return;
            setCommentIds((prev) => [...new Set([...prev, comment._id])]);
            setCommentsById((prev) => {
                const map = { ...prev };
                map[comment._id] = comment;
                return map;
            });
        };

        socket.on("new_comment", handleNewComment);

        return () => {
            socket.off("new_comment", handleNewComment);
        };
    }, [socket]);
};
