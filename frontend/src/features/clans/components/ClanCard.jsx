import { useNavigate } from "react-router-dom";

export default function ClanCard({ clan }) {
    const navigate = useNavigate();

    if (!clan) return null;

    const { name, logo } = clan;

    const handleOpenClan = () => navigate(`/c/${clan._id}`);

    return (
        <article
            onClick={handleOpenClan}
            className="group relative w-38 overflow-hidden rounded-[32px] border border-white/60 bg-white/20 backdrop-blur-3xl
        
        shadow-[0_4px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_16px_60px_rgba(15,23,42,0.10)] hover:bg-white/60"
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
                <div className="absolute left-1/7 top-0 size-52 rounded-full bg-amber-100/20 blur-2xl overflow-hidden" />

                <div className="absolute bottom-0 right-0 size-40 rounded-full bg-sky-100/20 blur-xl" />
            </div>
            <div className="relative z-10 flex flex-col gap-6 p-6 md:p-7">
                {/* Header */}
                <div className="flex items-start  gap-4">
                    <div className="flex flex-col items-center justify-center gap-4 z-30 pointer-events-auto">
                        <div className="size-10 rounded-full border" />
                        <div className="min-w-0 font-bold">{clan.name}</div>
                    </div>
                </div>
            </div>
        </article>
    );
}
