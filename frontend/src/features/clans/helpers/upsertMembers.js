export const upsertMembers = (members, prev) => {
    const map = { ...prev };
    members.forEach((member) => {
        map[member._id] = member;
    });

    return map;
};
