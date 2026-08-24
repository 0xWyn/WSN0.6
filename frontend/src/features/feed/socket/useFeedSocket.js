import { useEffect } from "react";
import { useEntities } from "../../global/EntityProvider";
import { useSocket } from "../../socket/SocketProvider";
import { useFeed } from "../context/FeedProvider";
import { normaliseComments, normalisePosts } from "../utils/normaliseEntities";
import { updateCommentsQuery, updatePostsQuery } from "../utils/updateQueries";

export const useFeedSocket = (clanId) => {
    const { socket } = useSocket();

    const { setEntities } = useEntities();
    const { setQueries } = useFeed();

    useEffect(() => {
        if (!socket) return;

        const handleNewPost = (post) => {
            setEntities((prev) => normalisePosts([post], prev));

            setQueries((prev) => updatePostsQuery([post], prev));
        };

        const handleUpdatedPost = (post) => {
            setEntities((prev) => normalisePosts([post], prev));
        };

        const handleUpdatedComment = (comment) => {
            console.log(comment);
            setEntities((prev) => normaliseComments([comment], prev));
        };

        const handleDeletedPost = (post) => {
            setEntities((prev) => {
                const map = { ...prev };
                delete map.posts[post._id];
                return map;
            });

            setQueries((prev) => ({
                ...prev,
                postsByClan: {
                    ...prev.postsByClan,
                    [post.clan]: prev.postsByClan[post.clan].filter(
                        (id) => id !== post._id
                    ),
                },
            }));
        };

        const handleNewComment = (comment) => {
            setEntities((prev) => normaliseComments([comment], prev));

            setQueries((prev) => updateCommentsQuery([comment], prev));
        };

        socket.on("new_comment", handleNewComment);
        socket.on("updated_post", handleUpdatedPost);
        socket.on("updated_comment", handleUpdatedComment);
        socket.on("new_post", handleNewPost);
        socket.on("deleted_post", handleDeletedPost);

        return () => {
            socket.off("new_comment", handleNewComment);
            socket.off("updated_post", handleUpdatedPost);
            socket.off("updated_comment", handleUpdatedComment);
            socket.off("new_post", handleNewPost);
            socket.off("deleted_post", handleDeletedPost);
        };
    }, [socket]);
};
