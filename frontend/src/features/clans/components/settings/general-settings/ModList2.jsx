import { useEffect, useState } from "react";
import { useClan } from "../../../context/ClanProvider";
import { useClanActions } from "../../../hooks/useClanActions";
import XMark from "../../../../../components/icons/x-mark";
import UserRoundArrowLeft from "../../../../../components/icons/user-round-arrow-left";
import { createPortal } from "react-dom";
export default function ModeratorList({ onCancel }) {
    const moderators = [
        {
            _id: "666999adhfl",
            name: "Winston Metong",
            username: "winston_",
            avatar: null,
        },
        {
            _id: "52095ifwoid",
            name: "Emperor Menelik",
            username: "menelik_",
            avatar: null,
        },
        {
            _id: "389ajfj021",
            name: "Susan Sarandon",
            username: "suze_sarandon",
            avatar: null,
        },
        {
            _id: "jdflkads0289",
            name: "James Winston",
            username: "j_dubbs",
            avatar: null,
        },
        {
            _id: "jdflkada230289",
            name: "James Winston",
            username: "j_dubbs",
            avatar: null,
        },
        {
            _id: "jdflkada239189",
            name: "James Winston",
            username: "j_dubbs",
            avatar: null,
        },
    ];

    const { activeClan: clan } = useClan();

    const { handleOwnershipTransfer } = useClanActions(clan._id);

    const onSelection = async (userId) => {
        const res = handleOwnershipTransfer(userId);
        console.log(res);
    };

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        console.log(selected);
    }, [selected]);
    return createPortal(
        <div className="fixed z-[101] inset-0 flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
            <div className="bg-white/80 border border-white/70 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl rounded-[28px] w-full max-w-md sm:max-w-xl p-8 h-140 overflow-hidden flex flex-col">
                <div className="flex justify-between">
                    <h1 className="font-medium text-lg tracking-tight text-slate-900">
                        Select a new Leader
                    </h1>

                    <button onClick={onCancel}>
                        <XMark />
                    </button>
                </div>
                <div>
                    <h2>Moderators</h2>
                </div>

                <div className="rounded-[14px] flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto mt-4 p-2">
                    {moderators.map((moderator) => (
                        <div
                            onClick={() => setSelected(moderator._id)}
                            key={moderator._id}
                            className={`flex items-center p-4 border border-slate-100 rounded-[14px] bg-slate-50/30 gap-2 hover:bg-white/50 transition-colors duration-300 cursor-pointer ${selected === moderator._id ? "bg-slate-900 text-sky-400" : ""}`}
                        >
                            {/* Avatar */}
                            <div className="size-12 rounded-[12px] shrink-0 shadow-sm bg-gradient-to-br from-sky-100 to-sky-200 overflow-hidden">
                                {moderator?.avatar?.url ? (
                                    <img
                                        src={moderator.avatar.url}
                                        alt={moderator.name}
                                        className="size-full object.cover"
                                    />
                                ) : (
                                    <div className="font-bold text-xl uppercase">
                                        {moderator.name.charAt[0]}
                                    </div>
                                )}
                            </div>

                            <div className="leading-5">
                                <h3 className="font-medium">
                                    {moderator.name}
                                </h3>
                                <h4 className="text-slate-600 text-sm">
                                    @{moderator.username}
                                </h4>
                            </div>

                            <button
                                className="border p-1 flex items-center justify-center rounded-lg bg-sky-300"
                                onClick={() => onSelection(moderator._id)}
                            >
                                <UserRoundArrowLeft size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}
