import { useEffect, useState } from "react";
import XMark from "../../../../../components/icons/x-mark";
import { useClan } from "../../../context/ClanProvider";

export default function ClanTags({ onEdit, abort }) {
    const { activeClan: clan } = useClan();

    const [input, setInput] = useState("");
    const [tags, setTags] = useState(clan.tags || []);

    const changed = JSON.stringify(tags) !== JSON.stringify(clan.tags);

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;

        const value = input.trim().toLowerCase();

        if (!value || tags.includes(value)) return;

        const updated = [...tags, value];

        setTags(updated);
        setInput("");
        onEdit("tags", updated);
    };

    const onDelete = (tag) => {
        const updated = tags.filter((item) => item !== tag);
        setTags(updated);
        onEdit("tags", updated);
    };

    useEffect(() => {
        changed &&
            abort &&
            (setTags(clan.tags), console.log("aborting in clan tags"));
    }, [changed, abort]);
    return (
        <div className="rounded-[20px] border border-white/60 bg-white/30 p-4 backdrop-blur-2xl">
            <div>
                {/* Write Up */}
                <h3 className="text-slate-700 text-sm font-medium">Tags</h3>

                <p className="mt-1 text-xs tracking-wide leading-5 text-slate-500">
                    Add a few words that describe your clan.
                </p>
            </div>

            <div className="flex min-h-11 items-center rounded-[15px] gap-2 py-2 mt-4 flex-wrap border border-white/60 bg-white/35 px-3">
                {tags.length > 0 &&
                    tags.map((tag) => (
                        <Tag
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
                    className="min-w-24 flex-1 bg-transparent text-xs tracking-wide text-slate-700 py-1 px-2 outline-none placeholder:text-slate-400 focus:border-b border-slate-400/80"
                    placeholder="Add a tag..."
                />
            </div>

            {/* <p className="mt-2 text-[10px] text-slate-400">
                Press Enter to add
            </p> */}
        </div>
    );
}

const Tag = ({ tag, onDelete }) => {
    return (
        <span className="group inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs tracking-wide text-slate-600 shadow-sm">
            #{tag}
            <button
                type="button"
                onClick={onDelete}
                className="flex size-4 items-center justify-center rounded-full text-slate-400 opacity-60 transition hover:bg-slate-200 hover:text-slate-600 hover:opacity-100"
                aria-label={`Remove ${tag}`}
            >
                <XMark size={9} />
            </button>
        </span>
    );
};
