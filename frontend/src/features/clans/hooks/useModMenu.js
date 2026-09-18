import { useClan } from "../context/ClanProvider";
import { useClanManagementLogic } from "./useClanManagementLogic";

export const useModMenu = (member) => {
    const { activeClan } = useClan();
    const { handlePromotion, handleDemotion, handleKick, handleExile } =
        useClanManagementLogic(member._id);

    const isAuthority = activeClan.role === "founder" || role === "leader";
    const isFounder = activeClan.role === "founder";

    const { role } = member;

    const actions = {
        role: {
            title: "role",
            permission: isFounder,
        },
        moderation: {
            title: "moderation",
            permission: isAuthority,
        },
        membership: {
            title: "membership",
            permission: isFounder,
        },
    };

    const menuItems = {
        role: {
            promote: {
                title: "Promote to Leader",
                visible: role === "member",
                onClick: handlePromotion,
            },
            demote: {
                title: "Revoke leadership",
                visible: role === "leader",
                onClick: handleDemotion,
            },
        },
        moderation: {
            warn: {
                title: "Warn",
                visible: true,
                onClick: () => console.log("Warning member"),
            },
            suspend: {
                title: "Suspend",
                visible: true,
                onClick: () => console.log("Suspending member"),
            },
        },
        membership: {
            kick: {
                title: "Remove from clan",
                visible: true,
                onClick: handleKick,
            },
            exile: {
                title: "Exile from clan",
                visible: true,
                destructive: true,
                onClick: handleExile,
            },
        },
    };

    return { actions, menuItems };
};
