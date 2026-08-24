import ExploreCard from "../../clans/components/ExploreCard";
import { useEntities } from "../../global/EntityProvider";

export default function CategorySection({ domain, clanIds }) {
    const { name, icon, description } = domain;
    const { entities } = useEntities();

    return (
        <section className="rounded-[28px] border border-white/60 bg-white/50 backdrop-blur-2xl p-6 px-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs">
            {/* Section Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex flex-col items-start mb-4 px-2">
                    <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                                {icon}
                            </span>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {name}
                            </h2>
                        </div>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                </div>

                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {clanIds.length} clan{clanIds.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Section Clans */}

            <div className="space-y-3 overflow-y-auto no-scrollbar max-h-100">
                {clanIds.map((id) => (
                    <ExploreCard key={id} clan={entities.clans[id]} />
                ))}
            </div>

            <button className="mt-4 rounded-full bg-white/50 !px-4 !py-2 !text-sm !font-medium text-slate-700 !transition-all !duration-200 border border-white hover:bg-white hover:text-slate-950 w-full">
                See more ↓
            </button>
        </section>
    );
}
