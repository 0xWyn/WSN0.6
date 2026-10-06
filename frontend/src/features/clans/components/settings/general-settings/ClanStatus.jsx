import { useState } from "react";
import { useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";

export default function ClanStatus({ onEdit }) {
    const { activeClan: clan } = useClan();
    if (!clan) return null;

    const { isFounder } = useClanAccess(clan);

    const [status, setStatus] = useState(clan.status);
    const isActive = status === "active";

    const handleChange = (option) => {
        setStatus(option);
        onEdit("status", option);
    };
    return (
        <div className="bg-slate-50/20 border border-white/60 backdrop-blur-2xl rounded-[22px] shadow-[0_4px_24px_rgba(80,90,100,0.02)] p-4">
            <div className="flex justify-between items-center gap-6">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span
                            className={`size-2 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-slate-400"}`}
                        />
                        <h3 className="text-slate-700 text-sm font-medium">
                            Clan Status
                        </h3>
                    </div>

                    <div className="mt-1 flex items-baseline gap-2">
                        <span
                            className={`capitalize text-sm font-medium ${isActive ? "text-emerald-700" : "text-slate-600"}`}
                        >
                            {status}
                        </span>
                    </div>
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
                        className={`relative shrink-0 h-7 w-12 flex p-1 rounded-full items-center transition-colors duration-300 focus:outline-none focus-visibile:ring-2 focus-visible:ring-sky-400/60 ${isActive ? "bg-emerald-400/80 " : "bg-slate-300/80 justify-start"} `}
                    >
                        <span
                            className={`block size-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-300 ${isActive ? "translate-x-5" : "translate-x-0"}`}
                        />
                    </button>
                )}
            </div>
            <div className="mt-3 border-t border-white/50 pt-3">
                <p className="text-xs leading-relaxed text-slate-500 ">
                    {isActive
                        ? "Your clan is active. Members can participate and new members can join"
                        : "You clan is deactivated. Members cannot participate and new members cannot join"}
                </p>
            </div>
        </div>
    );
}
