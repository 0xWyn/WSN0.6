import { useEffect, useState } from "react";
import { ChevronDown } from "../../../../../components/icons/chevron-down";
import { INTEREST_DOMAINS } from "../../../../../config/interestDomains";
import { useClan } from "../../../context/ClanProvider";

export default function ClanDomain({ onEdit, abort }) {
    const { activeClan: clan } = useClan();

    const [selectedDomain, setSelectedDomain] = useState(clan.domain);
    const [showDropdown, setShowDropdown] = useState(false);

    const changed = selectedDomain !== clan.domain;
    const domainDetails = INTEREST_DOMAINS.find(
        (domain) => domain.name === selectedDomain
    );

    const handleChange = (name) => {
        setSelectedDomain(name);
        setShowDropdown(false);
        onEdit("domain", name);
    };

    useEffect(() => {
        changed && abort && setSelectedDomain(clan.domain);
    }, [changed, abort]);

    return (
        <div className="bg-white/30 border border-white/60 backdrop-blur-2xl rounded-[20px] p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-slate-700 text-sm font-medium">
                        Domain
                    </h3>
                    <p className="mt-1 text-xs tracking-wide leading-5 text-slate-500">
                        Helps people discover what your clan is about.
                    </p>
                </div>

                <button
                    type="button"
                    className={`flex items-center justify-center !text-slate-400 !transition-all duration-600 hover:bg-white/60 hover:scale-[1.1] hover:text-slate-600 size-8 rounded-full ${
                        showDropdown ? "rotate-180" : ""
                    }`}
                    onClick={() => setShowDropdown((prev) => !prev)}
                >
                    <ChevronDown />
                </button>
            </div>

            <div
                tabIndex={-1}
                onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                        setShowDropdown(false);
                    }
                }}
                className="transition-all duration-300"
            >
                <button
                    type="button"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="mt-4 flex w-full items-center gap-3 rounded-[15px] border border-white/60 py-2.5 text-left transition hover:bg-white/60"
                >
                    {domainDetails && (
                        <span className="w-full flex justify-start gap-2 items-center rounded-[15px] p-2 bg-white/80 border border-slate-50 hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] active:shadow-none active:scale-[0.99] shadow-slate-200/30 transition-all duration-200">
                            <span className="flex size-8 items-center justify-center rounded-[10px] bg-white/70 text-base shadow-[0_2px_10px_rgba(120,120,120,0.1)]">
                                {domainDetails.icon}
                            </span>

                            <span className="text-sm font-medium text-slate-700">
                                {domainDetails.name}
                            </span>
                        </span>
                    )}
                </button>

                {showDropdown && (
                    <div className="mt-2 max-h-64 overflow-y-auto rounded-[16px] border border-white/70 bg-white/40 p-2 shadow-[0_12px_30px_rgba(50,60,70,0.08)] backdrop-blur-2xl overflow-hidden">
                        <div className="grid grid-cols-2 gap-1.5">
                            {INTEREST_DOMAINS.map(({ icon, name }) => {
                                const active = selectedDomain === name;

                                return (
                                    <button
                                        type="button"
                                        key={name}
                                        name="domain"
                                        onClick={() => handleChange(name)}
                                        className={`flex items-center gap-2 rounded-[12px] px-3 py-2 text-left text-[0.8rem] tracking-wide transition transition-colors duration-200 ${active ? "bg-sky-100/60 font-medium text-slate-800" : "hover:text-slate-800 text-slate-600 hover:bg-white/80 !font-normal"}`}
                                    >
                                        <span> {icon}</span>
                                        <span>{name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
