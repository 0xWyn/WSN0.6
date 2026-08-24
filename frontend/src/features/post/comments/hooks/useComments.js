import { useEffect, useState } from "react";
import { useFeed } from "../../../feed/context/FeedProvider";
import { normaliseComments } from "../../../feed/utils/normaliseEntities";
import {
    updateCommentsQuery,
    updateRepliesQuery,
} from "../../../feed/utils/updateQueries";
import { useEntities } from "../../../global/EntityProvider";
import {
    deleteComment,
    fetchComments,
    getReplies,
    postComment,
} from "../apis/commentApis";

export const useComments = (postId) => {
    const { setEntities, entities } = useEntities();
    const { setQueries } = useFeed();

    const [loadingComments, setLoadingComments] = useState({
        create: false,
        topLevel: false,
        sub: false,
    });

    useEffect(() => {
        if (!postId) return;
        const loadComments = async () => {
            try {
                setLoadingComments((prev) => ({ ...prev, topLevel: true }));
                const { data } = await fetchComments(postId);

                setEntities((prev) => normaliseComments(data, prev));

                setQueries((prev) => updateCommentsQuery(data, prev));
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingComments((prev) => ({ ...prev, topLevel: false }));
            }
        };

        loadComments();
    }, [postId]);

    const fetchReplying = (id) => {
        return entities?.users[entities?.comments?.[id]?.author];
    };

    const sendComment = async (comment) => {
        try {
            await postComment(comment);
        } catch {
            console.error(error);
        }
    };

    const removeComment = async (commentId) => {
        try {
            const depComment = entities.comments[commentId];

            const { parentPost, parentComment } = depComment;

            const { data } = await deleteComment(commentId);

            setEntities((prev) => ({
                ...prev,
                comments: { ...(prev.comments || {}), [commentId]: undefined },
            }));

            setQueries((prev) => ({
                ...prev,
                commentsByPost: {
                    ...prev.commentsByPost,
                    [parentPost]: prev.commentsByPost?.[parentPost]?.filter(
                        (id) => id !== commentId
                    ),
                },
                repliesByComment: {
                    ...prev.repliesByComment,
                    [parentComment]: prev.repliesByComment?.[
                        parentComment
                    ]?.filter((id) => id !== commentId),
                },
            }));

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadReplies = async (commentId) => {
        try {
            setLoadingComments((prev) => ({ ...prev, sub: true }));
            const { data } = await getReplies(commentId);

            console.log(data);
            setEntities((prev) => normaliseComments(data, prev));

            setQueries((prev) => updateRepliesQuery(data, prev));
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingComments((prev) => ({ ...prev, sub: false }));
        }
    };

    const getCommentCount = (postId) => {
        const comments = Object.values(entities.comments).reduce(
            (acc, comment) => {
                if (comment.parentPost === postId) {
                    acc += 1;
                }
                return acc;
            },
            0
        );

        console.log(comments);
    };

    return {
        sendComment,
        removeComment,
        loadingComments,
        loadReplies,
        getCommentCount,
        fetchReplying,
    };
};
