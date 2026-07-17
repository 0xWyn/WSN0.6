export default function CategorySkeleton({ count = 4 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <section
                    key={i}
                    className="skeleton-shimmer rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="h-7 w-40 rounded-full bg-slate-200" />

                        <div className="h-6 w-20 rounded-full bg-slate-200" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                        <div className="h-4 w-full rounded bg-slate-200" />
                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                    </div>

                    {/* Horizontal clan cards */}
                    <div className="flex gap-4 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, j) => (
                            <div
                                key={j}
                                className="w-[260px] shrink-0 rounded-3xl border border-slate-200 bg-white p-5"
                            >
                                {/* Avatar */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-14 rounded-full bg-slate-200" />

                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-28 rounded bg-slate-200" />
                                        <div className="h-3 w-16 rounded bg-slate-200" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2 mb-4">
                                    <div className="h-3 rounded bg-slate-200" />
                                    <div className="h-3 w-5/6 rounded bg-slate-200" />
                                    <div className="h-3 w-2/3 rounded bg-slate-200" />
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center">
                                    <div className="h-6 w-20 rounded-full bg-slate-200" />
                                    <div className="h-6 w-14 rounded-full bg-slate-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
}
