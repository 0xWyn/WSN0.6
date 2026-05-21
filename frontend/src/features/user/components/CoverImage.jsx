export default function Cover({ cover }) {
    return (
        <div className="relative h-56 overflow-hidden rounded-b-[2.5rem] border-b border-white/40">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" />
            {cover ? (
                <img src={cover} alt="Cover image" />
            ) : (
                <div className="h-full w-full bg-gradient-to-r from-slate-800 to-slate-600"></div>
            )}
        </div>
    );
}
