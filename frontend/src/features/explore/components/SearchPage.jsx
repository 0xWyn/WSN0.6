import { useEffect } from "react";
import LocNav from "../../navigation/components/LocNav";
import { useExplore } from "../context/ExploreProvider";
import ResultsContainer from "./ResultsContainer";
import SearchBar from "./SearchBar";
import SearchSkeleton from "./SearchSkeleton";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
    const { searching, results, searchTerm, setActiveSection, activeSection } =
        useExplore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!searchTerm) {
            navigate("/explore");
        }
    }, []);

    const categories = ["top", "clans", "posts", "users", "comments"];

    return (
        <div className="bg-[#f8fafc] min-h-screen w-full">
            {/* Decorative background */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden">
                <div className="absolute left-80 lg:left-1/4 top-0 size-[26rem] lg:size-[40rem] rounded-full bg-amber-200/15 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky top-0 w-full z-40">
                <div className="backdrop-blur-2xl flex items-center border-b border-white/40 bg-white/90 py-2">
                    <div className="absolute left-2">
                        <LocNav current="" />
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex w-[200px] sm:w-md md:w-lg border rounded-full border-slate-300">
                            <SearchBar location="explore" />
                        </div>
                    </div>
                </div>

                <div className="w-full backdrop-blur-2xl border-b border-white/40 bg-white/40">
                    <nav className="relative flex items-center justify-between w-full mx-auto max-w-xl overflow-hiddenpx-10 py-2 px-4">
                        {categories.map((cat, index) => {
                            return (
                                <>
                                    <button
                                        key={index}
                                        className={`${activeSection === cat ? "text-slate-950 font-bold border rounded-full py-0.5 px-2" : " text-slate-500 !font-medium"} transition-all duration-200 uppercase text-sm`}
                                        onClick={() => setActiveSection(cat)}
                                    >
                                        {cat}
                                    </button>
                                </>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="flex gap-2 px-3 text-sm pt-2">
                <p className="text-slate-600">Showing results for</p>
                <p className="text-blue-600 font-medium">"{searchTerm}"</p>
            </div>
            {/* Main */}
            <div className="px-4 py-6 z-10 flex flex-col gap-2">
                {/* Content */}
                <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
                    {searching && <SearchSkeleton />}
                    {results && <ResultsContainer />}
                </div>
            </div>
        </div>
    );
}
