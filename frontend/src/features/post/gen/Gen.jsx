export const Author = ({ author }) => {
    return (
        <div>
            <p>{author.username}</p>
        </div>
    );
};

import { useMemo, useState } from "react";

export const Media = ({ media }) => {
    const [current, setCurrent] = useState(0);

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

    return (
        <div className="relative w-full">
            <div>
                {arrangedMedia.length > 0 &&
                arrangedMedia[current].type === "image" ? (
                    <img src={arrangedMedia[current].url} alt="" />
                ) : (
                    <video src={arrangedMedia[current].src}></video>
                )}
            </div>
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
};

export const Text = ({ text }) => {
    return (
        <div>
            <p>{text}</p>
        </div>
    );
};
