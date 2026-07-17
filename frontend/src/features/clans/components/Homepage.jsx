import LocNav from "../../navigation/components/LocNav.jsx";
import SecondaryNavigation from "../../navigation/components/SecondaryNav.jsx";
import ClanContainer from "./ClanContainer.jsx";

import { useClan } from "../context/ClanProvider.jsx";

// Simple skeleton loader for better UX
function SkeletonLoader() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-6 w-1/3 rounded bg-slate-200" />
            <div className="h-24 w-full rounded bg-slate-200" />
            <div className="h-24 w-full rounded bg-slate-200" />
        </div>
    );
}

// Sidebar overview panel
function OverviewPanel({ clansCount = 0 }) {
    return (
        <div className="rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900">Overview</h3>
            <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                    <span className="text-slate-500">Clans Joined</span>
                    <span className="font-semibold text-slate-900">
                        {clansCount}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Active Members</span>
                    <span className="font-semibold text-slate-900">—</span>
                </div>
            </div>
        </div>
    );
}

// Sidebar discover panel
function DiscoverPanel() {
    return (
        <div className="rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900">Discover Clans</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
                Find active communities, trending discussions, and new groups
                that match your interests.
            </p>
            <button className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Explore Clans
            </button>
        </div>
    );
}

export default function HomePage() {
    const { loading, clans, setShowClanModal } = useClan();

    return (
        <div className="w-full h-full min-h-0 flex flex-col">
            <div className="sticky top-0 w-full flex backdrop-blur-2xl">
                <LocNav current="Home" redirect={false} />
                <SecondaryNavigation />
            </div>

            <div className="relative bg-[#f8fafc] px-4 py-6 flex-1">
                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />
                    <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
                </div>

                <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col gap-6 p-6">
                    {/* Header */}
                    <header className="rounded-[36px] border border-white/60 bg-white/35 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                                    Your Clans
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                    Build communities around ideas, hobbies,
                                    projects, and friendships.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowClanModal(true)}
                                className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                            >
                                Create Clan
                            </button>
                        </div>
                    </header>

                    {/* Main grid */}
                    <div className="grid flex-1 min-h-0 gap-6 min-[1200px]:grid-cols-[1fr_320px]">
                        {/* Clan list */}
                        <section className="min-h-0 overflow-hidden rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                                My Clans
                            </h2>
                            {loading ? <SkeletonLoader /> : <ClanContainer />}
                        </section>

                        {/* Sidebar */}
                        <aside className="flex flex-col gap-6">
                            <OverviewPanel
                                clansCount={Object.keys(clans ?? {}).length}
                            />
                            <DiscoverPanel />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
