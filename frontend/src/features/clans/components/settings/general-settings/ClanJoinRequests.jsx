import { useActiveClan, useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";

export default function ClanJoinRequests() {
    const { activeClan: clan } = useClan();
    if (!clan) return null;

    const { isFounder } = useClanAccess(clan);

    const joinRequestStatus = clan.privateSettings;
    console.log(clan);

    const jrStatus = true;
    return (
        <div>
            <h3 className="text-slate-800">
                Join Requests:{" "}
                <span className="text-slate-500 uppercase tracking-wide text-sm font-bold">
                    {/* {clan.status} */}
                </span>
            </h3>

            <p className="text-sm">New members may requests to join clan;</p>

            {isFounder && (
                <button
                    className={`flex ${jrStatus ? "bg-green-400 justify-end" : "bg-slate-500 justify-start"} rounded-full w-8 h-3 items-center transition-all duration-300`}
                >
                    <div className="w-1/2 h-5 rounded-full bg-slate-100 shadow-md" />
                </button>
            )}
        </div>
    );
}
