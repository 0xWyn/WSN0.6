import ArrowLeft from "../icons/arrow-left";
import { useNavigate } from "react-router-dom";

export default function LocNav({ current }) {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-14 bg-white border-bottom flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/60 !bg-white/20 px-4">
            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_60%)]
                "
            />
            <button
                className="relative z-10 !p-0 !rounded-xl aspect-square size-9 text-slate-600 !transition-all !duration-200 flex items-center justify-center hover:bg-white/70 hover:text-slate-900"
                onClick={() => navigate("..")}
            >
                <ArrowLeft />
            </button>
            <p className="relative z-10 text-[15px] font-semibold tracking-[0.1em] text-slate-800 uppercase">
                {current}
            </p>
        </div>
    );
}
