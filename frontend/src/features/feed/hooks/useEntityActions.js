import { useFeed } from "../context/FeedProvider";
import { normalisePosts } from "../utils/normalisePosts.js";
import { mergeEntities } from "../utils/mergeEntities.js";

export const useEntityActions = () => {
    const { setEntities, setQueries } = useFeed();

    const insertPosts = (posts, target) => {
        const { normalised } = normalisePosts(posts);

        // setEntities((prev) => ({
        //     ...prev,

        //     posts: mergeEntities(prev.posts, normalised.posts),

        //     users: {
        //         ...prev.users,
        //         ...normalised.users,
        //     },

        //     comments: prev.comments,
        // }));

        setEntities((prev) => ({
            ...prev,

            posts: mergeEntities(prev.posts, normalised.posts),

            users: mergeEntities(prev.users, normalised.users),
        }));

        setQueries((prev) => {
            // Queries, aka ids
            const next = { ...prev };

            const ids = posts.map((p) => p._id);

            if (target.type === "home") {
                next.homeFeed = [...new Set([...next.homeFeed, ...ids])];
            }

            if (target.type === "user") {
                next.usersPosts[target.userId] = [
                    ...new Set([
                        ...(next.usersPosts[target.userId] || []),
                        ...ids,
                    ]),
                ];
            }

            return next;
        });
    };

    const updatePost = (post) => {
        const { normalised } = normalisePosts([post]);

        setEntities((prev) => ({
            ...prev,

            posts: mergeEntities(prev.posts, normalised.posts),
        }));
    };

    const updateUser = (user) => {
        console.log("Hit this shit");
        setEntities((prev) => ({
            ...prev,
            users: mergeEntities(prev.users, [user]),
        }));
    };

    return { insertPosts, updatePost, updateUser };
};
