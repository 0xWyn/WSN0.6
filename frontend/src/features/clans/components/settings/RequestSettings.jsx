import { use, useState } from "react";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal";
import { useNavigate } from "react-router-dom";
import { useClan } from "../../context/ClanProvider";
import { useClanActions } from "../../hooks/useClanActions";

export default function RequestSettings() {
    const { activeClan: clan } = useClan();

    const joinRequests = clan.joinRequests || [];

    return (
        <div className="overflow-y-auto h-full p-2">
            {joinRequests.length > 0 ? (
                <div className="space-y-3 mb-50">
                    {joinRequests.map((req) => (
                        <div className="relative">
                            <RequestCard req={req} key={req._id} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center border">
                    No Requests
                </div>
            )}
        </div>
    );
}

const RequestCard = ({ req }) => {
    const navigate = useNavigate();
    const user = req.user;
    const { activeClan } = useClan();

    const viewAccount = () => {
        navigate(`/c/${activeClan._id}/requests/${req.user._id}`);
    };

    const { handleRejectRequest, handleAcceptRequest } = useClanActions(
        activeClan._id
    );

    return (
        <div className="group flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/30 backdrop-blur-sm p-4 shadow-[0_4px_5px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_10px_rgba(0,0,0,0.05)]">
            {/* User */}
            <div className="flex min-w-0 items-center gap-4">
                <button
                    onClick={viewAccount}
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200 to-sky-300 ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-[1.03]"
                    aria-label={`View ${user.username}'s profile`}
                >
                    {user.avatar?.url ? (
                        <img
                            src={user.avatar.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-700">
                            {user.username?.charAt(0).toUpperCase()}
                        </span>
                    )}
                </button>

                <div className="min-w-0">
                    <button
                        onClick={viewAccount}
                        className="block max-w-full truncate text-sm font-semibold text-slate-800 hover:underline"
                    >
                        @{user.username}
                    </button>

                    <p className="mt-0.5 text-xs text-slate-500">
                        Wants to join this clan
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
                <button
                    onClick={viewAccount}
                    className="hidden rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 sm:block"
                >
                    View profile
                </button>

                <button
                    onClick={() => handleRejectRequest(user._id)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                >
                    Decline
                </button>

                <button
                    onClick={() => handleAcceptRequest(user._id)}
                    className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};
