import { useEffect, useState } from "react";
import { useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";
import { toSentenceCase } from "../../../../../utils/toSentenceCase";

export default function ClanAccess({ onEdit, abort }) {
    const { activeClan: clan } = useClan();
    const { isFounder } = useClanAccess(clan);

    const [selected, setSelected] = useState(clan.access);
    const changed = selected !== clan.access;
    const options = [
        {
            value: "public",
            label: "Public",
            description: "Anyone can join your clan.",
        },
        {
            value: "private",
            label: "Private",
            description: "New members need approval to join.",
        },
    ];
    const cardDetails = {
        public: {
            title: "public",
            subtitle: "Anyone can join.",
        },
        private: {
            title: "private",
            subtitle: "Requests must be approved before new members can join.",
        },
    };

    const handleChange = (value) => {
        setSelected(value);
        onEdit("access", value);
    };

    useEffect(() => {
        changed &&
            abort &&
            (setSelected(clan.access), console.log("Aborting in clan access"));
    }, [changed, abort]);
    return (
        <div className="bg-white/30 border border-white/60 backdrop-blur-2xl rounded-[20px] p-4">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <h3 className="text-slate-700 text-sm font-medium">
                        Who can join
                    </h3>

                    <p className="mt-1 text-xs tracking-wide leading-5 text-slate-500">
                        Choose how new members enter your clan.
                    </p>
                </div>

                {!isFounder && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Founder only
                    </span>
                )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-[12px] bg-slate-200/30 p-2">
                {options.map((option) => {
                    const active = selected === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            disabled={!isFounder}
                            onClick={() => handleChange(option.value)}
                            className={`rounded-[8px] px-4 py-2.5 text-left inline-block transition-all duration-200 backdrop-blur-xl border ${
                                active
                                    ? "bg-white/60 text-slate-800 shadow-[0_10px_30px_rgba(60,81,10,0.06)] border-white/80"
                                    : "text-slate-500 hover:bg-white/40 border-slate-200/30"
                            } ${
                                !isFounder ? "cursor-default" : "cursor-pointer"
                            }`}
                        >
                            <p className="text-sm font-medium">
                                {option.label}
                            </p>

                            <p className="mt-0.5 text-xs tracking-wide leading-4 text-slate-400 font-normal">
                                {option.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
