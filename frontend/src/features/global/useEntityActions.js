import { useSetEntities } from "./EntityProvider";

export const useEntityActions = () => {
    const { setEntities } = useSetEntities();

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
            const map = { ...prev };

            users.forEach((user) => {
                map.users = {
                    ...map.users,

                    [user._id]: {
                        ...map.users[user._id],
                        ...user,
                    },
                };
            });

            return map;
        });
    };

    return {
        mergePosts,
        mergeUsers,
    };
};
