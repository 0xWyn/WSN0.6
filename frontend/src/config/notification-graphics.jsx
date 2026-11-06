import FaceSlightlySmilingPlus from "../components/icons/face-slightly-smiling-plus";
import ShieldHalf from "../components/icons/shield-half";
import { UserRoundX } from "../components/icons/user-round-x";
import UserStar from "../components/icons/user-star";
import HeartIconII from "../components/icons/heartII";
import HeartIcon from "../components/icons/heart";
import HeartLucide from "../components/icons/heart-lucide";

export const NotificationGraphics = {
    post_like: {
        icon: <HeartLucide />,
        bg_color: "bg-rose-200",
    },
    comment: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    reply: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    follow: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    join_request: {
        icon: <FaceSlightlySmilingPlus />,
        bg_color: "bg-amber-300",
    },
    new_clan_member: {
        icon: <FaceSlightlySmilingPlus />,
        bg_color: "bg-green-500",
    },
    clan_membership_approval: {
        icon: <UserStar />,
        bg_color: "bg-sky-200",
    },
    clan_promotion: {
        icon: <ShieldHalf />,
        bg_color: "bg-yellow-500",
    },
    clan_demotion: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_kick: {
        icon: <UserRoundX />,
        bg_color: "bg-rose-300",
    },
    clan_ban: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_deletion: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_deletion_scheduled: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_deletion_cancelled: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_activation: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_ownership_transfer: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_deactivation: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_ownership_transfer_request: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
};
