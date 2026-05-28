import { useEntities } from "./EntityProvider";

export const useEntityActions = () => {
    const { setEntities } = useEntities();

    const mergePosts = (posts) => {
        setEntities((prev) => {
            const next = { ...prev };

            posts.forEach((post) => {
                next.posts = {
                    ...next.posts,

                    [post._id]: {
                        ...next.posts[post._id],
                        ...post,
                        author: post.author._id,
                    },
                };

                next.users = {
                    ...next.users,

                    [post.author._id]: {
                        ...next.users[post.author._id],
                        ...post.author,
                    },
                };
            });

            return next;
        });
    };

    const mergeUsers = (users) => {
        setEntities((prev) => {
            const next = { ...prev };

            users.forEach((user) => {
                next.users = {
                    ...next.users,

                    [user._id]: {
                        ...next.users[user._id],
                        ...user,
                    },
                };
            });

            return next;
        });
    };

    return {
        mergePosts,
        mergeUsers,
    };
};
