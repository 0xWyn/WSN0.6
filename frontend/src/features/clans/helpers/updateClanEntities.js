export const upsertClans = (clan, prev) => {
    const map = { ...prev };

    map.clans = { ...(prev.clans || {}), [clan._id]: clan };

    return map;
};
