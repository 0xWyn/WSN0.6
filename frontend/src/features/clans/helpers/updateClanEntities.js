export const upsertClans = (clans, prev) => {
    const map = { ...prev };

    clans.forEach((clan) => {
        map.clans = {
            ...(map.clans || {}),
            [clan._id]: { ...(map.clans[clan._id] || {}), ...clan },
        };
    });
    return map;
};

export const updateClanDomain = (clans, prev) => {
    const map = { ...prev };

    clans.forEach((clan) => {
        map[clan.domain] = [
            ...new Set([...(map[clan.domain] || []), clan._id]),
        ];
    });

    return map;
};
