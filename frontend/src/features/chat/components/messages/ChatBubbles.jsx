export const RightBubble = ({ content, media, alignRight, position }) => {
    const colors = {
        blue: "bg-gradient-to-br from-sky-500 to-blue-500 border border-white/20 text-white shadow-[0_10px_28px_rgba(79,141,253,0.24)]",
        white: "bg-white/75 backdrop-blur-md text-slate-800 shadow-[0_4px_18px_rgba(15,23,42,0.06)]",
    };

    const radii = {
        single: `rounded-[26px] ${alignRight ? "rounded-br-md" : "rounded-bl-md"} `,
        top: `rounded-t-[26px] rounded-b-[22px]`,
        middle: `rounded-[22px]`,
        bottom: `${alignRight ? "rounded-br-sm" : "rounded-bl-sm"} rounded-b-[26px] rounded-t-[22px]`,
    };

    return (
        <div
            className={`relative max-w-[min(75%,38rem)] ${radii[position]} ${alignRight ? colors["blue"] : colors["white"]} px-4 py-4`}
        >
            <p className="whitespace-pre-wrap text-[15px] leading-7 font-[450]">
                {content}
            </p>
            {media.length > 0 && (
                <div className="mt-3 overflow-hidden rounded-2xl border border-black/5">
                    {media.type === "image" ? (
                        <img
                            src={media.url}
                            alt="attachment"
                            className="w-full object-cover"
                        />
                    ) : (
                        <video
                            src={media.url}
                            className="w-full object-cover"
                            controls
                        />
                    )}
                </div>
            )}
        </div>
    );
};
