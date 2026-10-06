import { useState } from "react";
import { Telescope } from "../../../components/icons/telescope.jsx";
import CategorySkeleton from "../../../components/ui/CategorySkeletonLoader.jsx";
import { INTEREST_DOMAINS } from "../../../config/interestDomains.js";
import LocNav from "../../navigation/components/LocNav.jsx";
import { useExplore } from "../context/ExploreProvider.jsx";
import CategorySection from "./CategorySection.jsx";
import PrivateGate from "./PrivateGate.jsx";
import ResultsContainer from "./ResultsContainer.jsx";
import SearchBar from "./SearchBar.jsx";
import { useClan } from "../../clans/context/ClanProvider.jsx";
import { useEntities } from "../../global/EntityProvider.jsx";
import { updateClanDomain } from "../../clans/helpers/updateClanEntities.js";

export default function ExplorePage() {
    const [selectedDomain, setSelectedDomain] = useState("all");
    const { results, loadingExplore } = useExplore();

    const { entities } = useEntities();

    const clansByDomain = updateClanDomain(Object.values(entities.clans), {});

    const { showPrivateGate } = useClan();

    const domainsToRender =
        selectedDomain === "all"
            ? INTEREST_DOMAINS
            : INTEREST_DOMAINS.filter(({ name }) => name === selectedDomain);

    if (loadingExplore) return <div>Loading..</div>;

    return (
        <div className="bg-[#f8fafc] min-h-screen w-full">
            {/* Decorative background */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden">
                <div className="absolute left-80 lg:left-1/4 top-0 size-[26rem] lg:size-[40rem] rounded-full bg-amber-200/15 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 z-40">
                <LocNav current="Explore" />
            </div>

            {/* Main */}
            <div className="px-4 py-6 z-10 flex flex-col gap-2">
                {/* Content */}
                <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
                    {/* Header */}
                    <header className="rounded-[32px] border border-white/60 bg-white/50 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] space-y-2">
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

                        {/* Nav */}
                        <nav className="mt-10 p-2 flex gap-2 overflow-x-auto no-scrollbar">
                            <button
                                type="button"
                                className={`relative flex shrink-0 !font-normal whitespace-nowrap items-center justify-center gap-2 px-3 !py-0.5 !rounded-full text-sm transition-all duration-200 ${selectedDomain === "all" ? "bg-slate-700 text-white shadow-[0_20px_90px_rgba(15,23,42,0.08)]" : "bg-white/65 text-slate-700 hover:bg-white"}`}
                                onClick={() => {
                                    setSelectedDomain("all");
                                }}
                            >
                                All
                            </button>

                            {/* Options */}
                            {INTEREST_DOMAINS.map(({ icon, name }) => (
                                <button
                                    type="button"
                                    key={name}
                                    className={`relative flex shrink-0 !font-normal whitespace-nowrap items-center justify-center gap-2 px-3 !py-1.5 !rounded-full text-sm transition-all duration-200 ${selectedDomain === name ? "bg-slate-700 text-white shadow-[0_20px_90px_rgba(15,23,42,0.08)]" : "bg-white/65 text-slate-700 hover:bg-white"}`}
                                    onClick={() => {
                                        setSelectedDomain(name);
                                    }}
                                >
                                    <span className="aspect-square flex items-center justify-center rounded-xl">
                                        {icon}
                                    </span>
                                    {name}
                                </button>
                            ))}
                        </nav>
                    </header>

                    {/* Clan Sections */}
                    <div className="p-4 lg:px-6 space-y-10 relative">
                        {loadingExplore ? (
                            <CategorySkeleton />
                        ) : (
                            domainsToRender.map((domain) => (
                                <CategorySection
                                    key={domain.name}
                                    domain={domain}
                                    type={selectedDomain}
                                    clanIds={clansByDomain?.[domain.name] ?? []}
                                />
                            ))
                        )}

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
