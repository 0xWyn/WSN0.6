export default function FullscreenLoader({
    title = "Loading",
    subtitle = "Please wait...",
}) {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-r from-white via-slate-50 to-slate-100">
            {/* What does this do ? */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-400 blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center gap-6">
                <div className="relative flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full border-4 border-slate-200" />
                    <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-b-600 border-r-violet-500" />
                    <div className="absolute h-10 w-10 rounded-full bg-white shadow-inner" />
                </div>

                <div className="space-y-2 text-center">
                    <p className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 bg-clip-text text-sm font-black uppercase tracking-[0.35em] text-transparent">
                        {title}
                    </p>

                    <p className="text-sm text-slate 500">{subtitle}</p>
                </div>
            </div>
        </div>
    );
}
