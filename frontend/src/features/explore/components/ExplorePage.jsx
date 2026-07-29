import { useState } from "react";
import { Telescope } from "../../../components/icons/telescope.jsx";
import CategorySkeleton from "../../../components/ui/CategorySkeletonLoader.jsx";
import { INTEREST_DOMAINS } from "../../../config/interestDomains.js";
import { useClan } from "../../clans/context/ClanProvider.jsx";
import LocNav from "../../navigation/components/LocNav.jsx";
import { useExplore } from "../context/ExploreProvider.jsx";
import { useExploreLogic } from "../hooks/useExplore.js";
import CategorySection from "./CategorySection.jsx";
import PrivateGate from "./PrivateGate.jsx";
import ResultsContainer from "./ResultsContainer.jsx";
import SearchBar from "./SearchBar.jsx";

export default function ExplorePage() {
    const { results, showPrivateGate } = useExplore();
    const { viewCategory } = useExploreLogic();
    const { clansByCategory, loading, clanEntities } = useClan();

    const [selectedDomain, setSelectedDomain] = useState("all");

    const domainsToRender =
        selectedDomain === "all"
            ? INTEREST_DOMAINS
            : INTEREST_DOMAINS.filter(({ name }) => name === selectedDomain);

    const EmptyState = () => {
        if (selectedDomain === "all") return;

        const clanIds = clansByCategory?.[selectedDomain] ?? [];

        if (clanIds.length > 0) return;

        const emptyDomain = INTEREST_DOMAINS.find(
            ({ name }) => name === selectedDomain
        );

        const { name, icon, description } = emptyDomain;

        return (
            <section className="rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-8 px-10 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs">
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
                        <p className="text-sm text-slate-500">{description}</p>
                    </div>
                </div>

                {/* Elements */}
                <div className="relative border border-slate-50/20 rounded-xl">
                    <section className="flex flex-col gap-2 py-2 rounded-3xl overflow-y-auto no-scrollbar max-h-100">
                        <div className="rounded-[32px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                            <h3 className="font-semibold text-slate-900">
                                No clans yet
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Create your first clan and start building a
                                community.
                            </p>
                        </div>
                    </section>
                </div>
            </section>
        );
    };

    return (
        <div className=" bg-[#f8fafc] min-h-0 flex flex-col w-full h-full">
            {/* Navigation */}
            <div className="w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 backdrop-blur-3xl z-10">
                <LocNav current="Explore" />
            </div>

            {/* Main */}
            <div className="relative bg-[#f8fafc] px-4 py-6 flex flex-col gap-2">
                {/* Decorative background */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/15 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col gap-6 p-6">
                    <header className="rounded-[32px] border border-white/90 bg-white/65 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] space-y-2">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex items-center gap-3">
                                <Telescope />
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Explore
                                </h1>
                            </div>
                            <p className="mb-5 max-w-2xl text-sm leading-7 text-slate-500">
                                Find communities around your interests.
                            </p>

                            <div className="w-full px-20 max-w-[480px]">
                                <SearchBar />
                            </div>
                        </div>

                        <nav className="mt-10 p-2 flex gap-2 overflow-x-auto no-scrollbar">
                            <button
                                type="button"
                                className={`relative flex shrink-0 whitespace-nowrap items-center justify-center gap-2 !px-4 !py-2 !rounded-full text-sm transition-all duration-200 ${selectedDomain === "all" ? "bg-slate-900 text-white shadow-[0_20px_90px_rgba(15,23,42,0.08)]" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"}`}
                                onClick={() => {
                                    setSelectedDomain("all");
                                }}
                            >
                                All
                            </button>
                            {INTEREST_DOMAINS.map(({ icon, name }) => (
                                <button
                                    type="button"
                                    key={name}
                                    className={`relative flex shrink-0 whitespace-nowrap items-center justify-center gap-2 !px-4 !py-1 !rounded-full text-sm transition-all duration-200 ${selectedDomain === name ? "bg-slate-900 text-white shadow-[0_20px_90px_rgba(15,23,42,0.08)]" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
                                    onClick={() => {
                                        setSelectedDomain(name);
                                    }}
                                >
                                    <span className="size-8 aspect-square flex items-center justify-center rounded-xl">
                                        {icon}
                                    </span>
                                    {name}
                                </button>
                            ))}
                        </nav>
                    </header>

                    {/* Clan Sections */}

                    <div className="p-4 lg:px-6 space-y-10 relative">
                        {loading ? (
                            <CategorySkeleton />
                        ) : (
                            domainsToRender.map((domain) => {
                                const clanIds =
                                    clansByCategory?.[domain.name] ?? [];
                                if (clanIds.length > 0)
                                    return (
                                        <CategorySection
                                            key={domain.name}
                                            domain={domain}
                                            clanIds={clanIds}
                                        />
                                    );
                            })
                        )}
                        <EmptyState />

                        {results && (
                            <div className="space-y-6 absolute z-20 w-full h-full bg-[#f8fafc]/10 backdrop-blur-lg top-0 rounded-xl shadow-[0_10px_40px_rgba(10, 10, 10, 0.5)] p-8">
                                <ResultsContainer />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showPrivateGate && <PrivateGate />}
        </div>
    );
}
