import { useState } from "react";
import { useExplore } from "../context/ExploreProvider";
import ResultSection from "./ResultSections";

export default function ResultsContainer() {
    const { results, searchTerm, activeSection, setActiveSection } =
        useExplore();

    const resultQtys = Object.entries(results).reduce((acc, [key, value]) => {
        if (value.length > 0) {
            acc[key] = value;
            return acc;
        }
        return acc;
    }, {});

    if (!results) return;

    const resultSections = Object.entries(resultQtys).map(([key, value]) => {
        return <ResultSection key={key} section={key} elements={value} />;
    });

    return (
        <div className="">
            <div className="w-full">
                <div className="overflow-y-auto no-scrollbar flex flex-col flex-1 overflow-hidden space-y-8 px-2 items-center">
                    {resultSections}
                </div>
            </div>
        </div>
    );
}
