import { useEffect, useMemo, useState } from "react";
import XMark from "../../../../components/icons/x-mark";
import { ChevronDown } from "../../../../components/icons/chevron-down";
import { ChevronDoubleLeft } from "../../../../components/icons/chevron-double-left";
import { ChevronDoubleRight } from "../../../../components/icons/chevron-double-right";

export const Preview = ({ files, handleRemove }) => {
    return (
        <div className="flex gap-2 overflow-x-auto p-3 pb-0">
            {files.map((file, i) => (
                <div
                    key={file.url}
                    className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                >
                    <button
                        onClick={() => handleRemove(i)}
                        className="absolute top-1 right-1 z-10 size-5  items-center justify-center !rounded-full bg-black/60 text-white !p-0 flex size-5 hover:scale-105 hover:bg-slate-900 active:bg-red-700 active:scale-95 transition duration-300 backdrop-blur"
                    >
                        <XMark />
                    </button>
                    {file.type.startsWith("image") ? (
                        <img
                            src={file.url}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        />
                    ) : (
                        <video
                            src={file.url}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
