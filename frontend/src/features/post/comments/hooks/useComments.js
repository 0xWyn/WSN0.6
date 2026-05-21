import { useEffect, useState } from "react";
import { fetchComments, getReplies, postComment } from "../apis/commentApis";
import { useCommentSocket } from "../socket/useCommentSocket";

export const useComments = (postId) => {
    const [commentIds, setCommentIds] = useState([]);
    const [commentsById, setCommentsById] = useState({});

    useCommentSocket(setCommentIds, setCommentsById, postId);

    const fetchCommentsData = async () => {
        try {
            const { data } = await fetchComments(postId);
            setCommentIds((prev) => [
                ...new Set([...prev, ...data.map((c) => c._id)]),
            ]);
            setCommentsById((prev) => {
                const map = { ...prev };
                data.forEach((c) => {
                    map[c._id] = c;
                });

                return map;
            });
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        if (!postId) return;
        fetchCommentsData();
    }, [postId]);

    return { commentIds, commentsById };
};
