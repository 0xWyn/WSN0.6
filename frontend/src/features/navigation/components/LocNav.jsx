import ArrowLeft from "../../../components/icons/arrow-left";
import { useNavigate } from "react-router-dom";

export default function LocNav({ current, redirect = true }) {
    const navigate = useNavigate();
    return (
        <div className="relative h-14 flex flex-1 min-w-0 shrink-0 items-center gap-3 overflow-hidden border border-white/10 !bg-white/20 px-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9))]" />
            {redirect && (
                <button
                    className="relative z-10 p-1 rounded-full text-slate-500 !transition-all !duration-200 hover:bg-white/70 hover:text-slate-900"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={18} />
                </button>
            )}
            <p className="relative z-10 text-lg font-medium text-slate-800">
                {current}
            </p>
        </div>
    );
}
