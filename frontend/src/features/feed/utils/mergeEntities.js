export const mergeEntities = (previous, update) => {
    const data = { ...previous }; // may be posts, user or any other form of data (sent from parent);
    for (const id in update) {
        data[id] = { ...previous[id], ...update[id] };
    }

    return data;
};
