import { useClan } from "../context/ClanProvider";
import { useClanAccess } from "../hooks/useClanAccess";
import Cog from "../../../components/icons/cog";
import { useNavigate } from "react-router-dom";

export default function ClanMenu({ clan }) {
    const { isAuthority, isMember, role } = useClanAccess(clan);
    const notifications = clan.joinRequests?.length;
    const navigate = useNavigate();

    const actions = {
        "manage-clan": {
            title: "Manage Clan",
            design: "bg-white text-slate-900 hover:bg-blue-100/70",
            function: () => navigate(`/c/${clan._id}/settings`),
            permitted: isAuthority,
            badge: notifications > 0,
            icon: <Cog size={16} />,
        },
        "leave-clan": {
            title: "Leave Clan",
            design: "bg-slate-950 text-white",
            function: () => console.log("Leaving clan"),
            permitted: isMember,
        },
    };

    return (
        <div className="flex flex-col shadow-md rounded-[14px] p-2 bg-white/60 border border-white/60 backdrop-blur-3xl transition space-y-1 w-40">
            {Object.values(actions).map(
                (action) =>
                    action.permitted && (
                        <button
                            key={action.title}
                            onClick={action.function}
                            className="cursor-pointer backdrop-blur-xl relative"
                        >
                            {action.badge && (
                                <span className="absolute -top-1 -right-1 size-[10px] rounded-full bg-rose-400 shadow-md" />
                            )}
                            <span
                                className={`${action.design} font-medium text-xs tracking-wide p-2 rounded-lg block transition duration-300 flex items-center gap-2 justify-center`}
                            >
                                {action?.icon}
                                {action.title}
                            </span>
                        </button>
                    )
            )}
        </div>
    );
}
