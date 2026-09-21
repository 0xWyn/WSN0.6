export const CLAN_ROLES = {
    FOUNDER: "owner",
    LEADER: "moderator",
    MEMBER: "member",
};

export function getClanRole(clan) {
    return clan.role;
}
