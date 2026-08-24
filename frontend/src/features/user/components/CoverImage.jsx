export default function Cover({ cover }) {
    return (
        <div className="relative h-56 overflow-hidden rounded-[2.5rem] border-b border-white/40">
            {cover ? (
                <img
                    src={cover}
                    alt="Cover image"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="h-full w-full bg-gradient-to-br from-black/5 via-transparent to-black/20 backdrop-blur-3xl" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]" />
        </div>
    );
}
