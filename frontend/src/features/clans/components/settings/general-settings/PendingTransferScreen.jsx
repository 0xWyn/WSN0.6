import { useClanManagement } from "../../../context/ClanManagementProvider";
import { useClanSettings } from "../../../hooks/useClanSettings";
import RequestedLeader from "./RequestedLeader";

export default function PendingTransferScreen({ onRevoke, onClose }) {
    const { pendingOwnershipTransfer } = useClanManagement();

    const leader = pendingOwnershipTransfer
        ? pendingOwnershipTransfer?.targetUser
        : null;

    return (
        <div className="py-6 pb-7">
            {/* Header */}
            <div className="mb-6 px-6 sm:px-10">
                <div className="mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-semibold tracking-wide text-amber-700 animate-pulse">
                        TRANSFER PENDING
                    </span>
                </div>

                <p className="mt-2 max-w-md text-[10px] tracking-[0.04em] leading-[1.5em] text-slate-600">
                    Your ownership transfer request is waiting for{" "}
                    <span className="font-semibold text-slate-800">
                        @{leader?.username}
                    </span>
                    . You'll remain the owner until they accept the transfer.
                </p>
            </div>

            {/* Successor */}

            <div className="px-6">
                <div className="rounded-2xl border border-slate-200/20 bg-slate-50/60 p-4 sm:p-5">
                    <p className="mb-3 text-[9px] uppercase tracking-wide font-medium text-slate-500">
                        YOUR CHOSEN SUCCESSOR
                    </p>

                    <RequestedLeader requestedLeader={leader} />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-slate-200/70 pt-5 px-6 sm:px-10">
                <p className="mb-4 text-xs leading-5 text-slate-500">
                    Changed your mind? You can revoke this request. The transfer
                    will not proceed unless your successor accepts it.
                </p>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onRevoke}
                        className="rounded-xl py-3 px-5 text-sm font-medium text-rose-600 transition hover:bg-rose-200 w-full"
                    >
                        Revoke request
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl py-3 px-5 text-sm font-medium text-slate-800 transition hover:bg-slate-800/80 hover:text-white w-full"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
