export default function ExpandableSection() {
    const clanIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

    const ExploreCard = () => {
        return (
            <div className="group relative rounded-3xl border border-white/60 bg-white/20 backdrop-blur-2xl p-2 mx-2 cursor-pointer shadow-[0px_2px_8px_rgba(15,23,100,0.05)] transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5  hover:shadow-[0px_2px_8px_rgba(15,23,100,0.09)]">
                <div className="relative flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 font-bold text-lg text-slate-800"></div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="truncate text-base font-semibold text-slate-700 group-hover:text-slate-900">
                                    Name
                                </h3>
                            </div>

                            <p className="text-sm leading-6 text-slate-500 truncate">
                                A place for members to connect, share ideas, and
                                participate in discussions.
                            </p>
                        </div>

                        <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium `}
                        >
                            Join
                        </span>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <section className="rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-8 px-10 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs">
            {/* Section Header */}
            <div className="mb-6">
                <div className="flex flex-col items-start mb-4 px-2">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-3 mb-2">
                            <span>❤️</span>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Category
                            </h2>
                        </div>
                        {clanIds.length > 0 ? (
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                {clanIds.length} clan
                                {clanIds.length > 1 ? "s" : ""}
                            </span>
                        ) : (
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                0 clans
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500">
                        Gaming, coding, AI, gardening, could be whatever you
                        want
                    </p>
                </div>
            </div>

            {/* Section Clans */}
            <div className="relative border border-slate-50/20 rounded-xl">
                <section className="flex flex-col gap-2 py-2 rounded-3xl overflow-y-auto no-scrollbar max-h-100 scroll-smooth transition-all duration-200">
                    {clanIds.map((id) => (
                        <ExploreCard key={id} />
                    ))}
                </section>
            </div>

            <button className=" !rounded-full !px-4 !py-2 !text-sm !ont-medium text-slate-600 !transition-all !duration-200 hover:bg-white/60 hover:text-slate-900 w-full">
                See more ↓
            </button>
        </section>
    );
}
