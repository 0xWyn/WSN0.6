import { useEffect } from "react";
import { useEntityActions } from "../../global/useEntityActions";
import { useSocket } from "../../socket/SocketProvider";
import { useQueryActions } from "../hooks/useQueryActions";
import { useEntities } from "../../global/EntityProvider";
import { useFeed } from "../context/FeedProvider";

export const useFeedSocket = (clanId) => {
    const { mergePosts } = useEntityActions();
    const { addClanPost, removeClanPost } = useQueryActions();
    const { socket } = useSocket();

    const { setEntities } = useEntities();
    const { setQueries } = useFeed();

    useEffect(() => {
        if (!socket) return;

        console.log("Registering feed listeners");

        const handleNewPost = (post) => {
            console.log("TRIGGERED");
            setEntities((prev) => ({
                ...prev,
                posts: {
                    [post._id]: { ...prev.posts[post._id], ...post },
                    ...prev.posts,
                },
            }));
            setQueries((prev) => ({
                ...prev,
                clanPostsIds: {
                    ...prev.clanPostsIds,
                    [post.clan]: [
                        ...new Set([
                            post._id,
                            ...(prev.clanPostsIds[post.clan] || []),
                        ]),
                    ],
                },
            }));
        };

        const handleUpdatedPost = (post) => {
            mergePosts([post]);
            console.log("Updated post");
        };

        const handleDeletedPost = (post) => {
            setEntities((prev) => {
                const map = { ...prev };
                delete map.posts[post._id];
                return map;
            });

            setQueries((prev) => ({
                ...prev,
                clanPostsIds: {
                    ...prev.clanPostsIds,
                    [post.clan]: prev.clanPostsIds[post.clan].filter(
                        (id) => id !== post._id
                    ),
                },
            }));
        };

        socket.on("updated_post", handleUpdatedPost);
        socket.on("new_post", handleNewPost);
        socket.on("deleted_post", handleDeletedPost);

        return () => {
            socket.off("updated_post", handleUpdatedPost);
            socket.off("new_post", handleNewPost);
            socket.off("deleted_post", handleDeletedPost);
        };
    }, [socket, clanId, mergePosts, removeClanPost]);
};
