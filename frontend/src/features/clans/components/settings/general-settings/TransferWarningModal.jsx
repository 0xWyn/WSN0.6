import { createPortal } from "react-dom";
import UserKey from "../../../../../components/icons/user-key";
import XMark from "../../../../../components/icons/x-mark";

export default function TransferWarningModal({ onCancel, onAccept }) {
    const options = [
        { name: "Continue transfer", action: onAccept },
        { name: "Cancel", action: onCancel },
    ];
    return createPortal(
        <div
            className="fixed inset-0 z-[101] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onCancel();
            }}
        >
            <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl">
                {/* Header */}
                <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50 to-white text-slate-800 shadow-sm shadow-sky-900/5">
                                <UserKey size={23} />
                            </div>
                            <div>
                                <h1
                                    id="transfer-title"
                                    className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-800 mb-0.5"
                                >
                                    Transfer ownership
                                </h1>
                                <p className="max-w-sm text-[0.75rem]  tracking-wide leading-relaxed text-slate-500">
                                    Review before proceeding
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onCancel}
                            aria-label="Close modal"
                            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200/70 text-slate-500 transition duration-300 hover:bg-white/40 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                            <XMark size={16} />
                        </button>
                    </div>
                </div>

                {/* Warning */}
                <div className="px-6 pt-7">
                    <div className="rounded-2xl border border-rose-200/40 bg-rose-50/40 overflow-hidden">
                        <div className="border-l-4 border-rose-400 px-6 py-4">
                            <p className="text-[0.8rem] font-medium text-red-700 tracking-wide">
                                You're giving up ownership
                            </p>

                            <p className="mt-2 text-[0.75rem] tracking-wide  leading-relaxed text-red-600/90">
                                Transferring ownership gives another member
                                control of this clan and its leadership.
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-[10px] tracking-[0.02rem] leading-[1.5rem] text-slate-700 border border-white/10 px-4 rounded-2xl">
                        Once the transfer is accepted, you'll lose your
                        ownership privileges. You won't be able to reverse the
                        transfer yourself. Your authority can only be restored
                        if the new owner grants it to you.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 px-6 pb-7 pt-8 sm:flex-row sm:justify-end">
                    {options.map((option) => {
                        const { name, action } = option;
                        return (
                            <button
                                key={name}
                                onClick={action}
                                className={`w-full rounded-xl py-3 px-5 text-sm transition duration-300 !font-medium ${name === "Continue transfer" ? "bg-rose-600 text-white shadow-sm shadow-rose-900/10 hover:bg-rose-700 active:scale-[0.98] " : "border border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-100"}`}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>,
        document.body
    );
}
