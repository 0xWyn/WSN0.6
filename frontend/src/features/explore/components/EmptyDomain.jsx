export const EmptyDomain = ({ domain }) => {
    const { name, icon, description } = domain;

    return (
        <section className="rounded-[28px] border border-white/60 bg-white/50 backdrop-blur-2xl p-6 px-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col items-start mb-4 px-2">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-3 mb-2">
                            <span>{icon}</span>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {name}
                            </h2>
                        </div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            0 clans
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>

            {/* Elements */}
            <div className="relative border border-slate-50/20 rounded-xl">
                <section className="flex flex-col gap-2 py-2 rounded-3xl overflow-y-auto no-scrollbar max-h-100">
                    <div className="rounded-[32px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                        <h3 className="font-semibold text-slate-800">
                            No clans yet
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Create your first clan and start building a
                            community.
                        </p>
                    </div>
                </section>
            </div>
        </section>
    );
};
