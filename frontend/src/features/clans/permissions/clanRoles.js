export const CLAN_ROLES = {
    OWNER: "owner",
    MODERATOR: "moderator",
    MEMBER: "member",
};

export function getClanRole(clan, userId) {
    if (!clan || !userId) return null;

    if (clan.owner._id === userId) {
        return CLAN_ROLES.OWNER;
    }

    if (clan.moderators?.includes(userId)) {
        return CLAN_ROLES.MODERATOR;
    }

    if (clan.members?.includes(userId)) {
        return CLAN_ROLES.MEMBER;
    }

    return null;
}
