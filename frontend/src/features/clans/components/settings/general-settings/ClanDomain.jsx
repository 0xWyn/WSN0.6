import { useState } from "react";
import { ChevronDown } from "../../../../../components/icons/chevron-down";
import { INTEREST_DOMAINS } from "../../../../../config/interestDomains";
import { useClan } from "../../../context/ClanProvider";
export default function ClanDomain({ onEdit }) {
    const { activeClan: clan } = useClan();
    const [selectedDomain, setSelectedDomain] = useState(clan.domain);
    const [showDropdown, setShowDropdown] = useState(false);

    const domainDetails = INTEREST_DOMAINS.find(
        (domain) => domain.name === selectedDomain
    );

    const handleChange = (option) => {
        setSelectedDomain(option);
        setShowDropdown(false);
        onEdit("domain", option);
    };
    return (
        <div className="bg-slate-50/20 border border-white/60 backdrop-blur-2xl rounded-[22px] shadow-[0_4px_24px_rgba(80,90,100,0.02)] p-4">
            {" "}
            <div className="flex flex-col space-y-1 relative">
                {/* Write Up */}
                <h3 className="text-slate-700 text-sm font-medium">
                    Clan Domain
                </h3>
                <div className="flex justify-between">
                    <p className="text-xs leading-relaxed text-slate-500 ">
                        Pick a topic to help other users find your clan.
                    </p>
                    <button
                        type="button"
                        className="flex items-center justify-centerbg-slate-10 !text-slate-500 !transition duration-200 hover:bg-white/90 hover:scale-[1.1] size-5 rounded-full"
                        onClick={() => setShowDropdown((prev) => !prev)}
                    >
                        <ChevronDown />
                    </button>
                </div>

                <div className="mt-3 pt-3 border-3 border-t border-white/40">
                    {domainDetails && (
                        <span
                            className={`flex shrink-0 whitespace-nowrap justify-center items-end gap-2 !px-3 !py-1 !rounded-full text-sm text-slate-800 bg-white/10 backdrop-blur-xl shadow-md hover:scale-[1.01] active:scale-[0.99] hover:bg-slate-100 transition-all duration-200 border font-medium cursor-pointer uppercase`}
                            onClick={() => setShowDropdown((prev) => !prev)}
                        >
                            <span className="border flex items-center justify-center rounded-md bg-slate-100 border-white/20">
                                {domainDetails.icon}
                            </span>
                            {domainDetails.name}
                        </span>
                    )}
                    {/* TopicMenu */}
                    {showDropdown && (
                        <div className="h-80 items-start bg-white/80 border border-white/80 z-100 p-6 px-6 rounded-3xl shadow-[0px_10px_30px_rgba(120,120,120,0.06)] backdrop-blur-md space-y-3 space-x-2 overflow-y-auto no-scrollbar top-12">
                            {/* Ambience */}
                            <div className="pointer-events-none fixed inset-0 opacity-70 min-h-0">
                                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl border" />
                                <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />
                            </div>

                            <div className="flex gap-2 flex-wrap sm:gap-6">
                                {INTEREST_DOMAINS.map(({ icon, name }) => (
                                    <button
                                        type="button"
                                        key={name}
                                        name="domain"
                                        value={name}
                                        className={`z-10 shrink-0 !flex  !gap-2 whitespace-nowrap bg-white/60 backdrop-blur-xl !items-end !px-3 !py-1 !rounded-full text-sm text-slate-800 active:scale-98  hover:scale-[1.01] hover:ring hover:ring-sky-500 transition-all duration-200 border ${selectedDomain === name ? "font-medium border border-indigo-700" : "!font-normal border border-white"}`}
                                        onClick={() => handleChange(name)}
                                    >
                                        {selectedDomain === name && (
                                            <div className="absolute size-2 bg-emerald-400/90 top-0 right-0 rounded-full"></div>
                                        )}
                                        <span>{icon}</span>
                                        <span>{name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
