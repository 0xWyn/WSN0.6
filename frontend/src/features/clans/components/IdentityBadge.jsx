import Crown from "../../../components/icons/crown";
import ShieldHalf from "../../../components/icons/shield-half";
import UserStar from "../../../components/icons/user-star";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { getClanRole } from "../permissions/clanRoles";

export const IdentityBadge = ({ clan }) => {
    if (!clan) return null;

    const user = useCurrentUser();

    const status = getClanRole(clan, user._id);

    const colors = {
        owner: "bg-yellow-400",
        moderator: "bg-green-400",
        member: "bg-purple-400",
    };

    const icons = {
        owner: <Crown />,
        moderator: <ShieldHalf />,
        member: <UserStar />,
    };

    return (
        <div
            className={`flex items-center justify-center size-8 p-2 rounded-md ${colors[status]}`}
        >
            {icons[status]}
        </div>
    );
};
