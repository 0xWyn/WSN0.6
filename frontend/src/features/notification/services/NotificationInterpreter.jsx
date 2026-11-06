import { clanCodes } from "../../../config/clanCodes";

const events = {
    follow: () => ({
        msg: `${username} followed you!`,
    }),
    post_like: ({ username = "" }) => ({
        msg: `Your post was liked by ${username}`,
    }),
    post_comment: ({ username = "", text = "" }) => ({
        msg: `${username} commented:\n${text}`,
    }),
    comment_like: ({ username = "" }) => ({
        msg: `Your comment was liked by ${username}`,
    }),
    comment_reply: ({ username = "", text = "" }) => ({
        msg: `${username} replied:\n${text}`,
    }),
    join_request: ({ name = "", userName = "", username = "" }) => ({
        msg: (
            <>
                <strong>{userName ?? username}</strong> wants to join{" "}
                <strong>{name}</strong>.
            </>
        ),
    }),
    new_clan_member: ({ name = "", userName = "" }) => ({
        msg: (
            <>
                <strong>{userName}</strong> has joined <strong>{name}</strong>
            </>
        ),
    }),
    clan_promotion: ({ name = "", rank }) => ({
        msg: (
            <>
                You have been promoted in <strong>{name}</strong>. New rank{" "}
                <strong>{rank.charAt(0).toUpperCase() + rank.slice(1)}</strong>!
            </>
        ),
    }),
    clan_demotion: ({ name = "", rank }) => ({
        msg: (
            <>
                You have been demoted in <strong>{name}</strong>. New rank{" "}
                <strong>{rank.charAt(0).toUpperCase() + rank.slice(1)}</strong>!
            </>
        ),
    }),
    clan_membership_approval: ({ name = "" }) => ({
        msg: (
            <>
                You are now a member of <strong>{name}</strong>.
            </>
        ),
    }),
    clan_kick: ({ name = "", violation = "" }) => ({
        msg: (
            <>
                You have been removed from <strong>{name}</strong> for{" "}
                <strong>{clanCodes[violation]}</strong>
            </>
        ),
    }),
    clan_ban: ({ name = "", reason = "" }) => ({
        msg: `You have been banned from ${name} for ${reason}.`,
    }),
    clan_deletion_scheduled: ({ name = "" }) => ({
        msg: `${name} has been scheduled for deletion and will be permanently removed from this site in 30 days.`,
    }),
    clan_deletion: ({ name = "" }) => ({
        msg: `${name} has been permanently deleted.`,
    }),
    clan_deletion_cancelled: ({ name = "" }) => ({
        msg: `The scheduled deletion of ${name} has been cancelled`,
    }),
    clan_activation: ({ name = "" }) => ({
        msg: `${name} has been deactivated.`,
    }),
    clan_ownership_transfer: ({ name = "", newFounder = "" }) => ({
        msg: `${newFounder} is now the founder of ${name}!`,
    }),
    clan_deactivation: ({ name = "" }) => ({
        msg: ``,
    }),

    clan_ownership_transfer_request: ({ name = "" }) => ({
        msg: `The founder of ${name ? name : "this clan"} wants to transfer ownership to you.`,
    }),
};

export const NotificationInterpreter = (notification) => {
    const { metadata = {}, event, entityModel, entity } = notification;

    const { msg = "" } = events[event]?.(metadata ?? {}) ?? {};
    const source = getNotificationSource(notification);

    return { msg, avatar: metadata?.avatar ?? "", event, source };
};

const getNotificationSource = (notification) => {
    const { entityModel, entity, metadata = {}, event } = notification;
    if (entityModel === "Clan") {
        if (event === "join_request") {
            return `/c/${entity}/settings/requests`;
        }

        if (event === "new_clan_member") {
            return `/c/${entity}/settings/members`;
        }
        return `/c/${entity}`;
    }

    if (entityModel === "Follow") {
        return `/users/${entity}`;
    }

    if (["Post", "Comment"].includes(entityModel)) {
        let { postId } = metadata;
        if (!postId) {
            if (entityModel === "Post") postId = entity;
            else return "/";
        }

        console.log(postId);

        const params = new URLSearchParams();

        if (metadata.comment) {
            params.set("comment", metadata.comment);
        }

        if (metadata.reply) {
            params.set("reply", metadata.reply);
        }

        const query = params.toString();

        return `/posts/${postId}${query ? `?${query}` : ""}`;
    }

    return "/";
};
