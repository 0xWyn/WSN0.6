import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Media({ media }) {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const arrangedMedia = useMemo(() => {
        return [...media].sort((a, b) => {
            if (a.type === b.type) return 0;
            // this means don't change the order of a and b
            if (a.type === "image") return -1;
            // this means put a before be
            return 1;
            // this means if the first condition fails, and the second condition fails, then it is the third condition that will run, basically (else if a.type === "video") return 1;
        });
    });

    const blurredBackground = (src, type) => {
        if (type === "image") {
            return (
                <img
                    src={src}
                    alt=""
                    className="w-full h-full absolute inset-0 blur-2xl object-cover scale-110 opacity-30 rounded-[24px] border border-gray-300"
                />
            );
        } else if (type === "video") {
            return (
                <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full absolute inset-0 blur-xl scale-110 opacity-80 rounded-[24px]"
                />
            );
        }
    };

    const RenderObject = ({ src, type }) => {
        if (type === "image") {
            return (
                <div
                    className="relative w-full h-full flex items-center justify-center pointer-events-auto"
                    onClick={() => navigate(src)}
                >
                    <img
                        src={src}
                        alt="Post media"
                        className="max-h-[34rem] w-full rounded-md shrink-0 z-10 object-contain"
                    />
                    {blurredBackground(src, type)}
                </div>
            );
        } else if (type === "video") {
            return (
                <div className="relative h-100 flex w-full justify-center rounded-[28px] my-1 pointer-events-auto overflow-hidden">
                    <video
                        src={src}
                        controls
                        className="relative z-10 w-full max-h-[36rem] bg-black/20 object-contain"
                    />
                    {blurredBackground(src, type)}
                </div>
            );
        }
    };
    return (
        <div className="relative overflow-hidden max-h-[32rem] min-h-[16rem] w-full rounded-[28px] border border-white/50 backdrop-blur-[10rem]">
            {arrangedMedia.length > 0 && (
                <RenderObject
                    src={arrangedMedia[current].url}
                    type={arrangedMedia[current].type}
                />
            )}
            {arrangedMedia.length > 1 && (
                <div className="w-full flex justify-between items-center absolute center">
                    <button
                        onClick={() =>
                            setCurrent((prev) =>
                                prev + 1 <= media.length ? prev + 1 : 0
                            )
                        }
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() =>
                            setCurrent((prev) =>
                                prev - 1 >= 0 ? prev - 1 : media.length
                            )
                        }
                    >
                        {">"}
                    </button>
                </div>
            )}
        </div>
    );
}
