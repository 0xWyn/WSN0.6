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

    const showSection = (section) => {
        if (section === "top") {
            if (Object.keys(resultQtys).length > 0) {
                return resultSections;
            } else {
                return (
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/30 backdrop-blur-xl px-6 py-10 text-center w-full">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl text-lg">
                                ✦
                            </div>
                            <h3 className="mt-4 text-md font-medium">
                                Nothing here!
                            </h3>
                            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                                No results found.
                            </p>
                        </div>
                    </div>
                );
            }
        }

        if (Boolean(resultQtys[section])) {
            const value = resultQtys[section];

            return (
                <ResultSection
                    section={section}
                    elements={value}
                ></ResultSection>
            );
        } else
            return (
                <div className="h-full w-full flex items-center justify-center">
                    <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/30 backdrop-blur-xl px-6 py-10 text-center w-full">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl text-lg">
                            ✦
                        </div>
                        <h3 className="mt-4 text-md font-medium">
                            Nothing here!
                        </h3>
                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                            No results found for {section}.
                        </p>
                    </div>
                </div>
            );
    };

    return (
        <div className="overflow-y-auto no-scrollbar flex flex-col flex-1 gap-8 md:px-12 py-2 items-center min-h-0">
            {showSection(activeSection)}
        </div>
    );
}
