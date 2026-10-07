export default function ClanContentSkeleton() {
    const count = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return (
        <div className="min-h-0 bg-[#f8fafc] min-w-0">
            {/* Ambience */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden">
                <div className="absolute left-80 lg:right-1/3 top-0 size-[26rem] lg:size-[40rem] rounded-full bg-amber-200/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            <div className="animate-pulse">
                {/* Nav */}
                <div className="sticky top-0 flex items-center z-30 justify-between bg-white/50 pr-4 backdrop-blur-xl h-14 flex-1 min-w-0"></div>
                {/* Main */}
                <div className="px-6 py-4 w-full">
                    <div className="relative mx-auto flex w-full max-w-7xl px-8 py-8 sm:px-6 lg:py-8 flex-col gap-4 items-center">
                        {/* Header */}
                        <div className="rounded-[32px] bg-white/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)] space-y-2 overflow-hidden h-60 w-full border border-white/70">
                            {/* Ambience */}
                            <div className="relative h-28 w-full overflow-hidden opacity-60">
                                <div className="absolute size-52 rounded-full top-4 -right-10 bg-sky-200/30 blur-2xl" />
                                <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-amber-300/20 blur-3xl" />
                            </div>
                            <div className="relative px-6 pb-6 sm:px-8">
                                <div className="-mt-12 flex items-end justify-between">
                                    <div className="flex size-24 items-center justify-center overflow-hidden rounded-[28px] bg-slate-200 text-3xl font-medium text-slate-700" />
                                    <div className="flex gap-2">
                                        <div className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100"></div>
                                        <div className="rounded-2xl border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 size-8 bg-slate-100"></div>
                                    </div>
                                </div>
                                {/* Identity */}
                                <div className="mt-4">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl h-3 bg-slate-200 rounded-full"></div>
                                            <div className="mt-2 w-1/2 text-sm leading-6 text-slate-500 h-3 bg-slate-100 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Other? */}
                        <div className="mt-6 px-4 w-full max-w-4xl">
                            <main className="min-w-0 flex flex-col gap-4">
                                {/* Composer */}
                                <div className="mb-5 flex w-full items-center gap-3 rounded-[32px] h-10 bg-slate-200 border border-white/70"></div>
                                {/* <ClanFeed /> */}
                                <div className="flex flex-col gap-4">
                                    {count.map((c) => (
                                        <div
                                            key={c}
                                            className=" p-5 sm:p-6 bg-white/80 border border-white rounded-[32px]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-slate-200 shrink-0" />
                                                <div className="space-y-2">
                                                    <div className="h-3 w-28 rounded-full bg-slate-200" />
                                                    <div className="h-2.5 w-20 rounded-full bg-slate-100" />
                                                </div>
                                            </div>
                                            <div className="mt-5 space-y-2">
                                                <div className="h-3 w-full rounded-full bg-slate-100" />
                                                <div className="h-3 w-4/5 rounded-full bg-slate-100" />
                                                <div className="h-3 w-2/5 rounded-full bg-slate-100" />
                                            </div>
                                            <div className="mt-5 h-10 w-48 rounded-xl bg-slate-100" />
                                        </div>
                                    ))}
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
