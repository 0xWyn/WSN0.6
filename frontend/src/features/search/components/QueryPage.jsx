import SearchBar from "./SearchBar.jsx";
import ResultsContainer from "./ResultsContainer.jsx";
import { useState } from "react";

export default function SearchContainer() {
    const [results, setResults] = useState(null);

    return (
        <div className="h-full bg-white rounded-md w-full p-2 flex flex-col gap-4">
            <SearchBar onSearch={handleSearch} />
            {results && <ResultsContainer results={results} />}
        </div>
    );
}
