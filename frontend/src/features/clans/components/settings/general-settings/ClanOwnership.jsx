import { useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";
import { SendHorizontal } from "../../../../../components/icons/send-horizontal";

export default function ClanOwnership() {
    const { activeClan: clan } = useClan();

    if (!clan) return null;

    const { founder } = clan;
    const { isFounder } = useClanAccess(clan);
    return (
        <div className="bg-slate-50/20 border border-white/60 backdrop-blur-2xl rounded-[22px] shadow-[0_4px_24px_rgba(80,90,100,0.02)] p-4">
            {" "}
            <div className="flex flex-col px-2">
                {/* Write Up */}
                <h3 className="text-slate-700 text-sm font-medium">
                    Clan Ownership
                </h3>

                <div className="flex flex-col gap-2 mt-3">
                    <div className="w-full p-2 border border-slate-200 rounded-2xl flex items-center gap-2">
                        {/* Avatar */}
                        <div className="h-12 w-12 rounded-full shrink-0 overflow-hidden">
                            {founder.avatar ? (
                                <img
                                    src={founder.avatar.url}
                                    alt="User profile picture"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="bg-purple-500 text-white font-bold flex items-center justify-center rounded-full">
                                    <p>
                                        {founder.name.charAt(0).toUpperCase()}
                                    </p>
                                </div>
                            )}
                        </div>
                        {/* Name */}
                        <div className="flex flex-col w-full">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="truncate text-sm font-medium text-slate-800">
                                    {founder.name}
                                </span>

                                {isFounder && (
                                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                                        You
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">
                                    @{founder.username}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-[9px] font-medium uppercase text-purple-400">
                                    Founder
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Actions */}

                    {isFounder && (
                        <button className="flex gap-2 items-center justify-center w-full border border-dashed border-slate-400 text-sm rounded-md py-1 !font-medium text-slate-500 transition duration-300 hover:bg-slate-700 hover:text-white hover:border-white hover:border-solid active:-translate-y-0.5">
                            <span className="">Transfer Ownership</span>
                            <div className="">
                                <SendHorizontal size="12" />
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
