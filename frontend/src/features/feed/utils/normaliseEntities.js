export const normalisePosts = (posts, prev) => {
    const map = { ...prev };

    posts.forEach((post) => {
        const existingPost = map.posts[post._id] || {};

        const author = post.author
            ? post.author._id || post.author
            : existingPost.author;

        map.posts = {
            ...map.posts,
            [post._id]: {
                ...existingPost,
                ...post,
                author,
            },
        };

        if (post.author && typeof post.author === "object") {
            const authorId = post.author._id;

            map.users = {
                ...map.users,
                [authorId]: {
                    ...map.users[authorId],
                    ...post.author,
                },
            };
        }
    });

    return map;
};

export const normaliseComments = (comments, prev) => {
    if (!(comments && prev)) return;
    const map = { ...prev };

    comments.forEach((comment) => {
        map.comments = {
            ...map.comments,
            [comment?._id]: { ...comment, author: comment.author._id },
        };

        map.users = {
            ...map.users,
            [comment.author._id]: {
                ...map.users[comment.author._id],
                ...comment.author,
            },
        };
    });

    return map;
};
