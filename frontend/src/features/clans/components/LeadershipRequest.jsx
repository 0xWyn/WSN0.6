import StandardModal from "../../../components/ui/StandardModal";
import { useClanManagement } from "../context/ClanManagementProvider";
import XMark from "../../../components/icons/x-mark";
import UserKey from "../../../components/icons/user-key";
import { useClanSettings } from "../hooks/useClanSettings";

export default function LeadershipRequest({ onClose }) {
    const { clanTransferRequest } = useClanManagement();

    if (!clanTransferRequest) return;

    const { clan, _id: reqId } = clanTransferRequest;
    const { handleAcceptOwnershipTransfer, handleRejvokeOwnershipTransfer } =
        useClanSettings();

    return (
        <StandardModal>
            <div
                role="dialog"
                aria-label="Leadership Request"
                aria-labelledby=""
                className="p-6 py-4"
            >
                {/* Header */}
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
                                Transfer request
                            </h1>
                            <p className="max-w-sm text-[0.75rem]  tracking-wide leading-relaxed text-slate-500/90">
                                You have been selected to be the head of{" "}
                                <span className="font-medium">
                                    {clan?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200/70 text-slate-500 transition duration-300 hover:bg-white/40 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        <XMark size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="pt-4 flex flex-col items-center">
                    {/* Graphic */}

                    <div className="outline-4 outline-slate-100 shadow-md rounded-3xl bg-gradient-to-br from-sky-300 to-sky-200 size-30 rounded-2xl overflow-hidden">
                        {clan?.avatar?.url ? (
                            <img src={clan?.avatar?.url} alt={clan?.name} />
                        ) : (
                            <div className="flex items-center justify-center rounded-full bg-slate-100 shadow-md">
                                {clan?.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <h1 className="text-2xl font-medium tracking-[0.02em] text-slate-800">
                            {clan?.name}
                        </h1>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 mb-2 flex gap-2 items-center">
                    <button
                        onClick={() => handleAcceptOwnershipTransfer(reqId)}
                        className="rounded-2xl font-medium w-full bg-slate-50/30 p-2 hover:bg-slate-50/70 transtion-colors duration-300"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => handleRejvokeOwnershipTransfer(reqId)}
                        className="rounded-2xl font-medium w-full bg-slate-50/30 p-2 hover:bg-slate-50/70 transtion-colors duration-300"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </StandardModal>
    );
}
