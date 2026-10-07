import Crown from "../../../components/icons/crown";
import ShieldHalf from "../../../components/icons/shield-half";
import UserStar from "../../../components/icons/user-star";

export const IdentityBadge = ({ clan }) => {
    if (!clan) return null;

    const status = clan.role;

    const colors = {
        founder: "text-sky-600",
        leader: "text-sky-600",
        member: "text-sky-600",
    };

    const icons = {
        founder: <Crown />,
        leader: <ShieldHalf />,
        member: <UserStar />,
    };

    return (
        <div
            className={`flex items-center justify-center size-6 p-1 rounded-full ${colors[status]} bg-sky-100/80`}
        >
            {icons[status]}
        </div>
    );
};
