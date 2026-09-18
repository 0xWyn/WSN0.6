export const upsertClans = (clans, prev) => {
    const map = { ...prev };

    clans.forEach((clan) => {
        map.clans = { ...(map.clans || {}), [clan._id]: clan };
    });
    return map;
};
