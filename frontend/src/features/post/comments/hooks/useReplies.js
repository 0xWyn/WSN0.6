import { useEffect, useState } from "react";
import { getReplies } from "../apis/commentApis";

export const useReplies = (commentId) => {
    const [replyIds, setReplyIds] = useState([]);
    const [repliesById, setRepliesById] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!commentId) return;

        console.log("I m triggered");
        const fetchReplies = async () => {
            try {
                const { data } = await getReplies(commentId);
                setReplyIds(data.map((reply) => reply._id));

                setRepliesById((prev) => {
                    const map = { ...prev };
                    data.forEach((reply) => {
                        map[reply._id] = reply;
                    });
                    return map;
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReplies();
    }, [commentId]);

    return { replyIds, repliesById, loading };
};
