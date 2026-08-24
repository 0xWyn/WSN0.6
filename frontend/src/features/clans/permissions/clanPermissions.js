import { CLAN_ROLES } from "./clanRoles";

export const CLAN_PERMISSIONS = {
    CREATE_POST: "create_post",

    MANAGE_REQUESTS: "manage_requests",
    REMOVE_MEMBER: "remove_member",
    BAN_MEMBER: "ban_member",
    MUTE_MEMBER: "mute_member",

    DELETE_ANY_POST: "delete_any_post",
    DELETE_ANY_COMMENT: "delete_any_comment",

    EDIT_CLAN: "edit_clan",
    MANAGE_MODERATORS: "manage_moderators",
    DELETE_CLAN: "delete_clan",
    TRANSFER_OWNERSHIP: "transfer_ownership",
};

export const ROLE_PERMISSIONS = {
    [CLAN_ROLES.MEMBER]: ["create_post"],

    [CLAN_ROLES.MODERATOR]: [
        "create_post",
        "manage_requests",
        "remove_member",
        "ban_member",
        "mute_member",
        "delete_any_post",
        "delete_any_comment",
    ],

    [CLAN_ROLES.OWNER]: [
        "create_post",
        "manage_requests",
        "remove_member",
        "ban_member",
        "mute_member",
        "delete_any_post",
        "delete_any_comment",
        "edit_clan",
        "manage_moderators",
        "delete_clan",
        "transfer_membership",
    ],
};
