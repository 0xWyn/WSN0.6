export default function MessageMenu() {
    const options = ["Edit", "Delete"];
    return (
        <div className="flex min-w-32 flex-col gap-1">
            {options.map((option) => (
                <button
                    key={option}
                    className="!px-3 !py-2 !rounded-xl text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5"
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
