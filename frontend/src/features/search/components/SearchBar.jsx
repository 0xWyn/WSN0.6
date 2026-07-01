import { useState } from "react";
import { useSearchLogic } from "../hooks/useSearchLogic";

export default function SearchBar({ location }) {
    const [term, setTerm] = useState("");
    const { handleClanDirectorySearch } = useSearchLogic();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;

        if (!term.trim()) {
            return alert("Search field must not be empty");
        }

        if (location === "clan-directory") {
            await handleClanDirectorySearch(term);
        }
    };
    return (
        // <div>
        //     <form
        //         onSubmit={handleSubmit}
        //         className="flex w-full justify-center gap-2"
        //     >
        //         <label htmlFor="searchInput">
        //             <input
        //                 type="text"
        //                 id="searchInput"
        //                 placeholder="Search"
        //                 className="border p-2 rounded-md"
        //                 value={term}
        //                 onChange={(e) => setTerm(e.target.value)}
        //             />
        //         </label>

        //         <button className="bg-slate-900 text-white">Search</button>
        //     </form>
        // </div>
        <div className="relative w-[420px]">
            {/* <SearchIcon className="..." /> */}

            <input
                placeholder="Search clans..."
                className="
            w-full
            rounded-2xl
            border
            border-white/60
            bg-white/40
            backdrop-blur-xl
            py-3
            pl-12
            pr-4
            text-sm
            shadow-sm
            outline-none
            transition
            focus:border-slate-300
            focus:ring-4
            focus:ring-slate-200/50
        "
            />

            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                Enter
            </kbd>
        </div>
    );
}
