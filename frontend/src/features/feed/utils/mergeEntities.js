export const mergeEntities = (previous, update) => {
    const data = { ...previous };
    update.map((update) => {
        update.follower
            ? (data[update._id] = update.follower)
            : (data[update._id] = update);
    });
    return data;
};
