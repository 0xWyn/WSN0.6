import Binary from "../../../components/icons/binary.jsx";
import { Blocks } from "../../../components/icons/blocks.jsx";
import GamepadDirectional from "../../../components/icons/gamepad-directional.jsx";
import { MessageSquareHeart } from "../../../components/icons/message-square-heart.jsx";
import { Telescope } from "../../../components/icons/telescope.jsx";
import ClanCard from "../../clans/components/ClanCard.jsx";
import { useClan } from "../../clans/context/ClanProvider.jsx";
import LocNav from "../../navigation/components/LocNav.jsx";
import { useSearch } from "../context/SearchProvider.jsx";
import { useExplore } from "../hooks/useExplore.js";
import ResultsContainer from "./ResultsContainer.jsx";
import SearchBar from "./SearchBar.jsx";
import CategorySkeleton from "../../../components/ui/CategorySkeletonLoader.jsx";
import { useEffect, useState } from "react";
import { toSentenceCase } from "../../../utils/toSentenceCase.js";
import Astroid from "../../../components/icons/astroid.jsx";
import { INTEREST_DOMAINS } from "../../../config/interestDomains.js";

export default function SearchContainer() {
    const { results } = useSearch();
    const { viewCategory } = useExplore();
    const { clansByCategory, loading, clanEntities } = useClan();

    const [selectedDomain, setSelectedDomain] = useState("all");
    return (
        <div className="relative bg-[#f8fafc] min-h-0 flex flex-col w-full h-full">
            <div className="w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 backdrop-blur-3xl z-10">
                <LocNav current="Explore" />
            </div>
            <div className="relative bg-[#f8fafc] px-4 py-6 flex flex-col gap-2">
                {/* Decorative background */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden h-screen">
                    <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-50/90 blur-3xl" />
                    <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
                </div>

                <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col gap-6 p-6">
                    <nav className="p-2 flex gap-2 overflow-x-auto no-scrollbar">
                        {INTEREST_DOMAINS.map(({ icon, name }) => (
                            <button
                                type="button"
                                key={name}
                                className={`flex shrink-0 whitespace-nowrap !items-start !justify-start gap-2 !px-3 !py-1 !rounded-full text-[14px] text-slate-800 bg-white/90 ring hover:scale-98 hover:bg-slate-100 hover:ring hover:ring-amber-500 transition-all duration-200 border ${selectedDomain === name ? "font-medium border-indigo-700 scale-102" : "!font-normal  border-white/50"}`}
                                onClick={(e) => {
                                    setSelectedDomain(name);
                                }}
                            >
                                {selectedDomain === name && (
                                    <div className="absolute size-2 bg-emerald-400/90 top-0 right-0 rounded-full"></div>
                                )}
                                {icon}
                                {name}
                            </button>
                        ))}
                    </nav>

                    <header className="rounded-[36px] border border-white/90 bg-white/35 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex items-center gap-3">
                                <Telescope />
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Explore Clans
                                </h1>
                            </div>
                            <p className="mb-5 max-w-2xl text-sm leading-7 text-slate-500">
                                Find communities around your interests.
                            </p>

                            <SearchBar />
                        </div>
                    </header>

                    {results && <ResultsContainer />}
                    {/* Clan Sections */}
                    {loading ? (
                        <CategorySkeleton />
                    ) : (
                        INTEREST_DOMAINS.map(({ name, icon }) => {
                            const clanIds = clansByCategory?.[name] ?? [];

                            return (
                                <section
                                    key={name}
                                    className="rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs"
                                >
                                    <div className="mb-6">
                                        <div className="flex flex-col items-start mb-4">
                                            <div className="flex w-full justify-between items-center">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span>{icon}</span>

                                                    <h2 className="text-2xl font-semibold text-slate-900">
                                                        {name}
                                                    </h2>
                                                </div>
                                                <button className=" !rounded-full !px-4 !py-2 !text-sm !ont-medium text-slate-600 !transition-all !duration-200 hover:bg-white hover:text-slate-900">
                                                    See all →
                                                </button>
                                            </div>
                                            {clanIds.length > 0 ? (
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                                    {clanIds.length} clan
                                                    {clanIds.length > 1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                                    0 clans
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent rounded-l-3xl z-50" />

                                        <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent rounded-r-3xl z-50" />
                                        <section className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-4 py-2 rounded-3xl">
                                            {clanIds.length > 0 ? (
                                                clanIds.map((id) => (
                                                    <ClanCard
                                                        key={id}
                                                        clan={clanEntities[id]}
                                                    />
                                                ))
                                            ) : (
                                                <div className="col-span-full rounded-[32px] border border-dashed border-slate-300 bg-white/60 p-12 text-center backdrop-blur-xl">
                                                    <h3 className="font-semibold text-slate-800">
                                                        No clans yet
                                                    </h3>
                                                    <p className="mt-2 text-sm text-slate-500">
                                                        Create your first clan
                                                        and start building a
                                                        community.
                                                    </p>
                                                </div>
                                            )}
                                        </section>
                                    </div>
                                </section>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
