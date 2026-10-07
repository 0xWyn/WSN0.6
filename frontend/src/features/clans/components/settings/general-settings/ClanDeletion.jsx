import { useEffect } from "react";
import { useClan } from "../../../context/ClanProvider";
import { useClanSettings } from "../../../hooks/useClanSettings";

export default function ClanDeletion() {
    const { activeClan: clan } = useClan();

    if (!clan) return null;

    const { handleClanDeletion } = useClanSettings(clan._id);
    const scheduled = Boolean(clan.deletionScheduledAt);

    // Add countdown to deletion
    return (
        <div className="rounded-[20px] border border-rose-200/50 bg-rose-50/20 p-4 backdrop-blur-2xl">
            <div>
                <h3 className="text-sm font-medium text-rose-700">
                    Delete clan
                </h3>

                <p className="mt-1 text-xs leading-5 text-rose-600/60">
                    {scheduled
                        ? "Your clan is scheduled for permanent deletion."
                        : "Deleting your clan starts a 30-day deletion period."}
                </p>
            </div>

            <button
                type="button"
                onClick={handleClanDeletion}
                className={`mt-4 w-full rounded-[13px] py-2 text-xs tracking-wide font-medium transition ${
                    scheduled
                        ? "bg-white/60 text-slate-600 hover:bg-white/90"
                        : "bg-rose-500/80 text-white shadow-sm hover:bg-rose-500"
                }`}
            >
                {scheduled ? "Cancel deletion" : "Schedule clan deletion"}
            </button>
        </div>
    );
}
