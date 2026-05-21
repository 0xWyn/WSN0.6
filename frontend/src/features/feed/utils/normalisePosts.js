export const normalisePosts = (posts) => {
    const normalised = {
        posts: {},
        users: {},
    };

    posts.forEach((post) => {
        if (post.author) {
            normalised.users[post.author._id] = post.author;
        }

        normalised.posts[post._id] = {
            ...post,
            author: post.author?._id,
        };
    });
    return { normalised };
};
