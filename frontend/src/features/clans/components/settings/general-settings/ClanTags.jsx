import { useState } from "react";
import { useClan } from "../../../context/ClanProvider";
import XMark from "../../../../../components/icons/x-mark";
import { useClanManagement } from "../../../context/ClanManagementProvider";

export default function ClanTags({ onEdit }) {
    const { activeClan: clan } = useClan();
    const [input, setInput] = useState("");

    const [tags, setTags] = useState(clan.tags);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!input.trim()) return;
            setInput("");
            const map = [...tags];
            map.push(input);
            onEdit("tags", map);
            setTags(map);
        }
    };

    const onDelete = (tag) => {
        const map = [...tags];
        const update = map.filter((t) => t !== tag);
        setTags(update);
        onEdit("tags", update);
    };

    return (
        <div className="bg-slate-50/20 border border-white/60 backdrop-blur-2xl rounded-[22px] shadow-[0_4px_24px_rgba(80,90,100,0.02)] p-4">
            <div className="flex flex-col px-2">
                {/* Write Up */}
                <h3 className="text-slate-700 text-sm font-medium">
                    Clan Tags
                </h3>
                <div className="flex gap-2 py-2 mt-2 flex-wrap space-y-2.5">
                    {tags.length > 0 &&
                        tags.map((tag) => (
                            <TagEl
                                key={tag}
                                tag={tag}
                                onDelete={() => onDelete(tag)}
                            />
                        ))}

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-sm text-slate-600 py-1 px-4 rounded-full border border-slate-300 bg-slate-200 outline-none lowercase w-full"
                        placeholder="#Add a tag"
                    />
                </div>
            </div>
        </div>
    );
}

const TagEl = ({ tag, onDelete }) => {
    return (
        <p className="text-sm text-slate-500 py-1 px-4 rounded-full border border-slate-200 bg-slate-200/60 backdrop-blur-xl relative">
            <button
                onClick={onDelete}
                className="absolute border border-slate-400 rounded-full -top-2 -right-2 z-20 flex items-center justify-center bg-slate-300 p-0.5 hover:bg-slate-400 hover:text-slate-500 active:scale-[0.80] transition-all duration-300 text-slate-400 group"
            >
                <XMark size={10} />
                <span className="absolute bottom-full text-red-950/50 whitespace-nowrap opacity-0 group-hover:opacity-100 border-slate-400 bg-white rounded-md text-xs transition-all duration-300 px-2 !font-normal z-50">
                    Delete tag
                </span>
            </button>
            <span className="truncate">#{tag}</span>
        </p>
    );
};

// We have the general clan settings which are derived from active clan.
// Editing the clan uses a form that is derived from clan state Const [form, setForm] = useState({...clan});
// Each component has access to its particular field in the form and should be able to alter that particular field
// So far, options for hosting the form are general settings and clan management provider which sort of sucks and I don't want to deal with that so I'm not going to.
// So in genereal settings
