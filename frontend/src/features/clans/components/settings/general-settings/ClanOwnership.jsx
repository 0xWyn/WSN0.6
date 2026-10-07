import { useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";
import { SendHorizontal } from "../../../../../components/icons/send-horizontal";

export default function ClanOwnership() {
    const { activeClan: clan } = useClan();

    if (!clan) return null;

    const { founder } = clan;
    const { isFounder } = useClanAccess(clan);

    return (
        <div className="border border-white/60 bg-white/30 backdrop-blur-2xl rounded-[20px] p-4">
            <div>
                <h3 className="text-slate-700 text-sm font-medium">
                    Ownership
                </h3>

                <p className="mt-1 text-xs tracking-wide leading-5 text-slate-500">
                    The founder currently owns this clan.
                </p>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-white/60 bg-white/40 p-3">
                {/* Avatar */}
                <div className="size-11 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-amber-200 to-sky-200">
                    {founder.avatar?.url ? (
                        <img
                            src={founder.avatar.url}
                            alt={founder.name}
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center font-center font-mediun text-slate-700">
                            {founder.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-slate-800">
                            {founder.name}
                        </span>

                        {isFounder && (
                            <span className="bg-sky-100/60 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-sky-600">
                                You
                            </span>
                        )}
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500">
                        @{founder.username} • Founder
                    </p>
                </div>
            </div>
            {/* Actions */}

            {isFounder && (
                <button
                    type="button"
                    className="mt-3 flex gap-2 items-center justify-center w-full border border-white/70 bg-white/40 text-xs rounded-[13px] py-2 !font-medium text-slate-500 transition duration-300 hover:bg-white/70 hover:text-slate-700"
                >
                    Transfer Ownership
                    <SendHorizontal size="12" />
                </button>
            )}
        </div>
    );
}
