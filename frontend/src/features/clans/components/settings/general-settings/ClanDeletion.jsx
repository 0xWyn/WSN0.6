import { useActiveClan, useClan } from "../../../context/ClanProvider";
import { useClanSettings } from "../../../hooks/useClanSettings";

export default function ClanDeletion() {
    const { activeClan: clan } = useClan();

    if (!clan) return null;

    const { handleClanDeletion } = useClanSettings(clan._id);

    return (
        <div className="bg-slate-50/20 border border-white/60 backdrop-blur-2xl rounded-[22px] shadow-[0_4px_24px_rgba(80,90,100,0.02)] p-4">
            <h3 className="text-slate-700 text-sm font-medium">Deletion</h3>
            <p className="text-sm text-slate-500">
                {clan.deletionScheduledAt ? (
                    "Your clan is deactivated and will be permanently deleted after so and so days."
                ) : (
                    <>Delete your clan after 30 days.</>
                )}
            </p>
            <button
                onClick={handleClanDeletion}
                className={`${clan.deletionScheduledAt ? "bg-slate-400 text-white" : "bg-red-400 text-white border border-red-300"} w-full py-2 rounded-[16px] my-4 transtion-all duration-300`}
            >
                {clan.deletionScheduledAt ? "Abort Deletion" : "Delete Clan"}
            </button>
        </div>
    );
}
