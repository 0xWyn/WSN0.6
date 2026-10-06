import { useState } from "react";
import { useClan } from "../../../context/ClanProvider";
import { useClanAccess } from "../../../hooks/useClanAccess";
import { toSentenceCase } from "../../../../../utils/toSentenceCase";

export default function ClanAccess({ onEdit }) {
    const { activeClan: clan } = useClan();

    const { isFounder } = useClanAccess(clan);

    const [selected, setSelected] = useState(clan.access);
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

    const handleChange = (option) => {
        setSelected(option);

        onEdit("access", option);
    };
    return (
        <div className="bg-slate-50/20 border border-white/60 backdrop-blur-2xl rounded-[22px] shadow-[0_4px_24px_rgba(80,90,100,0.02)] p-4">
            <div className="flex flex-col">
                {/* Write Up */}
                <h3 className="text-slate-700 text-sm font-medium">
                    Clan Access
                </h3>

                <div className="flex justify-between p-2 px-6 gap-4">
                    {Object.values(cardDetails).map((option) => (
                        <div
                            key={option.title}
                            onClick={() => handleChange(option.title)}
                            className={`${selected === option.title ? "border border-sky-200 outline outline-amber-300 bg-white/20" : "border border-slate-200/50 bg-slate-200/50"} p-2 cursor-pointer hover:scale-[1.05] active:scale-[0.99] flex flex-col w-40 rounded-[28px] items-center shadow-[0px_8px_10px_rgba(150,150,150,0.1)] gap-4 text-center transition-all duration-300 hover:shadow-lg w-full backdrop-blur-3xl `}
                        >
                            <span className="font-medium text-md text-slate-700 tracking-tight leading-6">
                                {toSentenceCase(option.title)}
                            </span>

                            {/* <span className="text-slate-500 text-sm">
                        {option.subtitle}
                    </span> */}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-3 border-t border-white/50 pt-3">
                <p className="text-xs leading-relaxed text-slate-500 ">
                    {cardDetails[selected].subtitle}
                </p>
            </div>
        </div>
    );
}
