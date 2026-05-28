export default function Stats({ following, followers }) {
    const items = [
        { name: Object.keys({ following })[0], data: following },
        { name: Object.keys({ followers })[0], data: followers },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
                <div
                    key={item.name}
                    className="rounded-[24px] border !border-white/60 !bg-white/10 backdrop-blur-xl p-4 text-center"
                >
                    <p className="text-xs text-slate-500 capitalize">
                        {item.name}
                    </p>

                    <p className="mt-2 text-2xl tracking-tight font-semibold text-slate-900">
                        {item.data.length}
                    </p>
                </div>
            ))}
        </div>
    );
}
