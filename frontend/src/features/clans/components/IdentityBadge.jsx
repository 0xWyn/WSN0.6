import Crown from "../../../components/icons/crown";
import ShieldHalf from "../../../components/icons/shield-half";
import UserStar from "../../../components/icons/user-star";

export const IdentityBadge = ({ clan }) => {
    if (!clan) return null;

    const status = clan.role;

    const colors = {
        founder: "bg-purple-400",
        leader: "bg-yellow-400",
        member: "bg-green-400",
    };

    const icons = {
        founder: <Crown />,
        leader: <ShieldHalf />,
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
