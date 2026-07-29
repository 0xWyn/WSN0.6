import { useState } from "react";
import { useExplore } from "../context/ExploreProvider";

export default function ResultsContainer() {
    const { searching, setResults } = useExplore();

    const [results, resetResults] = useState([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ]);

    const searchTerm = "React";

    // if (!results) return null;

    const sections = ["Clans"];

    return (
        <div className="rounded-[32px] border border-white/60 bg-white/60 shadow-[0_10px_40px_rgba(15,23,42,0.05)] p-8 flex flex-col space-y-3 relative">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex gap-2 items-center">
                    <button
                        className="border border-white/80 size-8 flex items-center justify-center rounded-full hover:bg-white/60 transition-all duration-300"
                        onClick={() => setResults(null)}
                    >
                        {"<"}
                    </button>
                    <h2 className="font-bold text-xl">
                        Results ({results.length})
                    </h2>
                </div>

                <div className="flex gap-2">
                    <p className="text-slate-600">Showing results for</p>
                    <p className="text-blue-600 font-medium">"{searchTerm}"</p>
                </div>
            </div>

            <div className="overflow-y-auto no-scrollbar flex-1 h-[420px] overflow-hidden space-y-3 px-2">
                {results.map((res) => (
                    <div
                        key={res}
                        className="w-full h-[90px] rounded-xl bg-white/20  border border-white shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
                    ></div>
                ))}
            </div>
        </div>
    );
}
