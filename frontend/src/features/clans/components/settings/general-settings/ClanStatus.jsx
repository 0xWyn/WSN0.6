import { useEffect, useState } from "react";
import { useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";

export default function ClanStatus({ onEdit, abort }) {
    const { activeClan: clan } = useClan();
    if (!clan) return null;

    const { isFounder } = useClanAccess(clan);

    const [status, setStatus] = useState(clan.status);
    const isActive = status === "active";

    const changed = status !== clan.status;
    const handleChange = (option) => {
        setStatus(option);
        onEdit("status", option);
    };

    useEffect(() => {
        changed && abort && setStatus(clan.status);
    }, [changed, abort]);

    useEffect(() => {
        setStatus(clan.status);
    }, [clan.status]);
    return (
        <div className="bg-white/30 border border-white/60 backdrop-blur-2xl rounded-[20px] p-4">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`size-2 rounded-full ${isActive ? "bg-teal-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-slate-400"}`}
                        />
                        <h3 className="text-slate-700 text-sm font-medium">
                            Status
                        </h3>
                    </div>

                    <p className="mt-2 text-xs tracking-wide leading-5 text-slate-500">
                        {isActive
                            ? "The clan is active and available to members."
                            : "The clan is currently inactive."}
                    </p>
                </div>

                {isFounder && (
                    <button
                        type="button"
                        role="switch"
                        aria-checked={isActive}
                        aria-label={
                            isActive ? "Deactivate clan" : "Activate clan"
                        }
                        onClick={() =>
                            handleChange(isActive ? "deactivated" : "active")
                        }
                        className={`relative shrink-0 h-7 w-12 flex p-1 rounded-full items-center transition-colors duration-300 focus:outline-none focus-visibile:ring-2 focus-visible:ring-sky-400/60 ${isActive ? "bg-teal-400/80 " : "bg-slate-300/80 justify-start"} `}
                    >
                        <span
                            className={`block size-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-300 ${isActive ? "translate-x-5" : "translate-x-0"}`}
                        />
                    </button>
                )}
            </div>
            <div className="mt-3 border-t border-white/50 pt-3"></div>
        </div>
    );
}
