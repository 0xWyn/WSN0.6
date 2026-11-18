import { useNavigate } from "react-router-dom";
import { useClan } from "../../../clans/context/ClanProvider";

export default function ClanEntity({ entity: clan }) {
    if (!clan) return null;
    const navigate = useNavigate();

    const handleOpenClan = () => navigate(`/c/${clan._id}`);
    const { setActiveClan } = useClan();
    return (
        <div
            onClick={() => {
                setActiveClan(clan);
                handleOpenClan();
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/65 backdrop-blur-2xl p-5 cursor-pointer shadow-sm transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0px_2px_8px_rgba(15,23,100,0.09)]"
        >
            {/* Background accents */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-sky-100/20 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-amber-100/20 blur-2xl" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    {clan.avatar?.url ? (
                        <img
                            src={clan.avatar.url}
                            alt={clan.name}
                            className="h-14 w-14 rounded-full object-cover border border-white/70 shadow-sm"
                        />
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 font-bold text-lg text-slate-800">
                            {clan.name?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-slate-900">
                            {clan?.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 truncate">
                            {clan?.description ||
                                "A place for members to connect, share ideas, and participate in discussions."}
                        </p>
                    </div>

                    <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                            clan.access === "Private"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                        }`}
                    >
                        {clan.access || "Public"}
                    </span>
                </div>
            </div>
        </div>
    );
}
