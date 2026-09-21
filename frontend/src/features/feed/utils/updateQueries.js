export const updatePostsQuery = (posts, prev) => {
    if (!(posts && prev)) return;

    const map = { ...prev };

    posts.forEach((post) => {
        const { _id, clan, author } = post;

        map.postsByClan = {
            ...map.postsByClan,
            [clan]: [...new Set([...(map.postsByClan[clan] || []), _id])],
        };

        map.postsByUser = {
            ...map.postsByUser,
            [author._id]: [
                ...new Set([...(map.postsByUser[author._id] || []), _id]),
            ],
        };
    });
    return map;
};

export const updateCommentsQuery = (comments, prev) => {
    const map = { ...prev };

    comments.forEach((comment) => {
        const { _id, parentPost, parentComment } = comment;

        if (!parentComment) {
            map.commentsByPost = {
                ...map.commentsByPost,
                [parentPost]: [
                    ...new Set([
                        ...(map.commentsByPost[parentPost] || []),
                        _id,
                    ]),
                ],
            };
        }

        if (parentComment) {
            map.repliesByComment = {
                ...map.repliesByComment,
                [parentComment]: [
                    ...new Set([
                        ...(map.repliesByComment[parentComment] || []),
                        _id,
                    ]),
                ],
            };
        }
    });

    return map;
};

export const updateRepliesQuery = (replies, prev) => {
    const map = { ...prev };

    replies.forEach((reply) => {
        map.repliesByComment = {
            ...map.repliesByComment,
            [reply.parentComment]: [
                ...new Set([
                    ...(map.repliesByComment[reply.parentComment] || []),
                    reply._id,
                ]),
            ],
        };
    });

    return map;
};
