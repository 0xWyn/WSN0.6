export default function RequestedLeader({ requestedLeader }) {
    return (
        <div
            className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 focus-visible:outline-none !font-normal focus-visible:ring-2 focus-visible:ring-sky-400 bg-emerald-100/20 border-emerald-600/50 `}
        >
            {/* Avatar */}
            <div
                className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] transition-colors bg-gradient-to-br from-sky-200 to-sky-300 bg-gradient-to-br from-amber-100 to-sky-100`}
            >
                {requestedLeader.avatar?.url ? (
                    <img
                        src={requestedLeader.avatar.url}
                        alt=""
                        className="size-full object-cover"
                    />
                ) : (
                    <span className="text-sm font-semibold text-slate-700">
                        {requestedLeader.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            {/* Identity */}
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-slate-800">
                    {requestedLeader.name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                    @{requestedLeader.username}
                </p>
            </div>
        </div>
    );
}
