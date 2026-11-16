import { useState } from "react";
import { useSearchLogic } from "../hooks/useSearchLogic";
import { MagnifyingGlass } from "../../../components/icons/magnifying-glass";
import { useExplore } from "../context/ExploreProvider";

export default function SearchBar({ location = "clan-directory" }) {
    const { handleClanDirectorySearch, handleSearchExplore } = useSearchLogic();
    const { searchTerm, setSearchTerm } = useExplore();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            return alert("Search field must not be empty");
        }

        if (location === "clan-directory") {
            handleClanDirectorySearch(searchTerm);
        }

        if (location === "explore") {
            handleSearchExplore(searchTerm);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex items-center w-full rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl px-4 text-sm transition-all duration-200 focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-200/50 text-slate-500"
        >
            <MagnifyingGlass />
            <input
                placeholder="Search clans..."
                className="flex-1 bg-transparent px-2 py-3 outline-none text-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
    );
}
