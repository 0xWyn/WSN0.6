import { createPortal } from "react-dom";

export default function StandardModal({ children }) {
    return createPortal(
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
            <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl max-h-[min(680px,calc(100dvh-2rem))]">
                {children}
            </div>
        </div>,
        document.body
    );
}
