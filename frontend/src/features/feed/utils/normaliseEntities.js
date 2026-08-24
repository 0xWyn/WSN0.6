export const normalisePosts = (posts, prev) => {
    const map = { ...prev };

    posts.forEach((post) => {
        map.posts = {
            ...map.posts,
            [post._id]: { ...post, author: post.author._id },
        };

        map.users = {
            ...map.users,
            [post.author._id]: {
                ...map.users[post.author._id],
                ...post.author,
            },
        };
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
