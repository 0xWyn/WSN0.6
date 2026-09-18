export const upsertMembers = (members, prev) => {
    console.log("upserting members");
    const map = { ...prev };
    members.forEach((member) => {
        map[member._id] = member;
    });

    return map;
};
