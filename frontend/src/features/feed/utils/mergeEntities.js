export const mergeFollowers = (previous, update) => {
    const next = { ...previous };
    update.map((update) => {
        update.follower
            ? (next[update._id] = update.follower)
            : (next[update._id] = update);
    });
    return next;
};

export const mergeFollowing = (previous, update) => {
    const next = { ...previous };
    update.map((update) => {
        next[update._id] = update.user;
    });

    console.log(next);

    return next;
};
