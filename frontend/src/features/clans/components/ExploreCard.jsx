import { useNavigate } from "react-router-dom";
import Earth from "../../../components/icons/earth";
import LockKeyhole from "../../../components/icons/lock-keyhole";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useClan } from "../context/ClanProvider";
import { useClanActions } from "../hooks/useClanActions";

export default function ExploreCard({ clan }) {
    const navigate = useNavigate();
    const auth = useCurrentUser();
    const { setShowPrivateGate } = useClan();

    const { handleJoinClan } = useClanActions(clan._id);

    const handleOpenClan = () => navigate(`/c/${clan._id}`);
    const handlePrivateClan = () => {
        clan.role ? handleOpenClan() : setShowPrivateGate(clan);
    };

    const isRequested = clan.requested;

    const isOwner = clan.founder._id === auth._id;

    const actionLabel = clan?.access === "public" ? "Join" : "Request";

    return (
        <div
            onClick={
                clan?.access === "private" ? handlePrivateClan : handleOpenClan
            }
            className="group relative rounded-3xl border border-white bg-white/60 backdrop-blur-2xl p-3 m-1 cursor-pointer shadow-[0px_2px_8px_rgba(15,23,100,0.05)] transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0px_2px_8px_rgba(15,23,100,0.09)]"
        >
            <div className="flex items-center gap-4">
                {clan?.avatar?.url ? (
                    <img
                        src={clan?.avatar.url}
                        alt={clan?.name}
                        className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-slate-200 shadow-sm"
                    />
                ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 font-bold text-lg text-slate-800 ring-1 ring-slate-200">
                        {clan?.name?.charAt(0).toUpperCase()}
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-slate-900">
                        {clan?.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 truncate">
                        {clan?.description ||
                            "A place for members to connect, share ideas, and participate in discussions."}
                    </p>
                </div>

                {clan.role ? (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-all duration-300 flex items-center gap-1">
                        {isOwner && <span className="-mt-1">👑</span>}
                        Member
                    </span>
                ) : isRequested ? (
                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                        🕒 Approval Pending
                    </span>
                ) : (
                    <button
                        type="button"
                        className={`flex items-end gap-1 shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition duration-300 ${clan?.access === "public" ? "text-slate-600 hover:bg-slate-200" : "hover:bg-violet-600 hover:bg-violet-500"} tracking-wide transition-all duration-200`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleJoinClan(clan?._id);
                        }}
                    >
                        <span className="">
                            {clan?.access === "public" ? (
                                <Earth size={14} />
                            ) : (
                                <LockKeyhole size={14} />
                            )}
                        </span>
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
