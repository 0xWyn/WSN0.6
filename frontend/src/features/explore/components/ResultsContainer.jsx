import { useSearch } from "../context/SearchProvider";

export default function ResultsContainer() {
    const { searching, results } = useSearch();
    if (!results) return null;

    return (
        <div className="bg-white rounded-3xl w-full p-2 flex flex-col gap-2">
            {results && <div>The results are in</div>}
        </div>
    );
}
