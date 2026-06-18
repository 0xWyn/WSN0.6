import { useNavigate } from "react-router-dom";

export default function ClanCard({ clan }) {
    const navigate = useNavigate();
    console.log(clan);

    const handleOpenClan = () => navigate(`/c/${clan._id}`);

    return (
        <div
            onClick={handleOpenClan}
            className="group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-4 cursor-pointer w-full shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(15,23,42,0.10)] hover:bg-white/50"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
                <div className="absolute left-1/7 top-0 size-52 rounded-full bg-amber-100/20 blur-2xl overflow-hidden" />

                <div className="absolute bottom-0 right-0 size-40 rounded-full bg-sky-100/20 blur-xl" />
            </div>

            <div className="relative z-10 flex flex-col justify-center md:flex-row md:items-center gap-5 p-6 md:p-7">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {clan.avatar.url ? (
                        <img
                            src={clan.avatar.url}
                            alt={clan.name}
                            className="h-16 w-16 rounded-full object-cover border border-white/70 shadow-md"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 font-bold text-xl text-slate-800 shadow-md">
                            {clan.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="truncate text-lg font-semibold text-slate-900">
                            {clan.name}
                        </h3>

                        <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600">
                            Community
                        </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {clan.description ||
                            "A place for members to connect, share ideas, and participate in discussions."}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                        <span>{clan.members?.length ?? 0} members</span>

                        <span className="h-1 w-1 rounded-full bg-slate-400" />

                        <span>{clan.visibility || "Public"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
