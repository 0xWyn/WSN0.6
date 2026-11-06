import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import UserKey from "../../../../../components/icons/user-key";
import XMark from "../../../../../components/icons/x-mark";
import { useClanManagement } from "../../../context/ClanManagementProvider";
import { useClan } from "../../../context/ClanProvider";
import { useClanSettings } from "../../../hooks/useClanSettings";
import LeaderList from "./LeaderList";
import PendingTransferScreen from "./PendingTransferScreen";

export default function TransferScreen({ onCancel, onBack }) {
    const { activeClan: clan } = useClan();

    const [maxLoading, setMaxLoading] = useState(true);

    const { fetchClanLeaders, fetchPendingTransfer, loadingClanSettings } =
        useClanSettings(clan._id);

    const { pendingOwnershipTransfer } = useClanManagement();

    useEffect(() => {
        fetchPendingTransfer();
        fetchClanLeaders();
    }, []);

    useEffect(() => {
        setMaxLoading(
            !loadingClanSettings.fetchLeaders &&
                !loadingClanSettings.fetchPendingTransfer
                ? false
                : true
        );
    }, [
        loadingClanSettings.fetchLeaders,
        loadingClanSettings.fetchPendingTransfer,
    ]);

    return createPortal(
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="transfer-title"
                className="flex w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl max-h-[min(680px,calc(100dvh-2rem))]"
            >
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
                                <p className="max-w-sm text-[0.75rem]  tracking-wide leading-relaxed text-slate-500/90">
                                    Choose a leader to take ownership of your
                                    clan.
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

                {maxLoading ? (
                    <div className="flex items-center justify-center px-6 pb-8 pt-6 sm:px-8">
                        <span className="border-4 border-r-transparent border-blue-600 size-10 rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {pendingOwnershipTransfer ? (
                            <PendingTransferScreen
                                onRevoke={() =>
                                    setShowPendingTransferScreen(false)
                                }
                                onClose={onCancel}
                            />
                        ) : (
                            <LeaderList onCancel={onCancel} onBack={onBack} />
                        )}
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
