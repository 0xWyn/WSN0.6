import { useNavigate } from "react-router-dom";
import Earth from "../../../components/icons/earth";
import LockKeyhole from "../../../components/icons/lock-keyhole";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useExplore } from "../../explore/context/ExploreProvider";
import { useClanActions } from "../hooks/useClanActions";

export default function ExploreCard({ clan }) {
    const navigate = useNavigate();
    const auth = useCurrentUser();
    const { handleJoinClan } = useClanActions();
    const { setShowPrivateGate } = useExplore();

    const handleOpenClan = () => navigate(`/c/${clan._id}`);
    const handlePrivateClan = () => {
        clan.members.includes(auth._id.toString())
            ? handleOpenClan()
            : setShowPrivateGate(clan);
    };

    const isMember = clan?.members?.includes(auth._id);
    const isRequested = clan?.joinRequests?.find(
        ({ user }) => user === auth._id
    );
    const isOwner = clan?.owner.toString() === auth._id.toString();

    const actionLabel = clan?.visibility === "public" ? "Join" : "Request";

    return (
        <div
            onClick={
                clan?.visibility === "private"
                    ? handlePrivateClan
                    : handleOpenClan
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

                {!isMember ? (
                    isRequested ? (
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                            🕒 Approval Pending
                        </span>
                    ) : (
                        <button
                            type="button"
                            className={`flex items-center gap-1 shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition duration-300 text-white ${clan?.visibility === "public" ? "bg-slate-900 hover:bg-slate-800" : "hover:bg-violet-600 hover:bg-violet-500"} tracking-wide`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleJoinClan(clan?._id);
                            }}
                        >
                            <span className="">
                                {clan?.visibility === "public" ? (
                                    <Earth size={14} />
                                ) : (
                                    <LockKeyhole size={14} />
                                )}
                            </span>
                            {actionLabel}
                        </button>
                    )
                ) : (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-all duration-300 flex items-center gap-1">
                        {isOwner && <span className="-mt-1">👑</span>}
                        Member
                    </span>
                )}
            </div>
        </div>
    );
}
