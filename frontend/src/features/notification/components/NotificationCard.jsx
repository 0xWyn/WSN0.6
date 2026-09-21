import { useNavigate } from "react-router-dom";
import UserStar from "../../../components/icons/user-star";
import ShieldHalf from "../../../components/icons/shield-half";
import { notificationInterpreter } from "../services/notificationInterpreter";

const graphic = {
    clan_membership_approval: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
    clan_promotion: {
        icon: <ShieldHalf />,
        bg_color: "bg-yellow-500",
    },
    clan_demotion: {
        icon: <UserStar />,
        bg_color: "bg-green-500",
    },
};

export default function NotificationCard({ notification }) {
    const data = notificationInterpreter(notification);

    const { msg, entityAvatar, type, source } = data;
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(source)}
            className={`group relative rounded-3xl border backdrop-blur-2xl p-2 cursor-pointer shadow-[0px_2px_8px_rgba(15,23,100,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_2px_8px_rgba(15,23,100,0.09)] flex gap-2 items-center ${notification.readAt ? "bg-slate-200 hover:bg-white/60 border-none" : "bg-white/60 hover:bg-white/80 border-white"}`}
        >
            {/* Icon */}
            <span
                className={`${graphic[type].bg_color} p-1 rounded-md size-6 flex items-center`}
            >
                {graphic[type].icon}
            </span>

            {/* Msg & Graphic */}
            <div className="flex justify-between items-center w-full">
                <p className="text-sm leading-6 text-slate-600 truncate">
                    {msg}
                </p>
                <div className="h-12 outline-2 outline-white overflow-hidden rounded-md">
                    <img
                        src={entityAvatar}
                        alt="avatar"
                        className="h-14 object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
