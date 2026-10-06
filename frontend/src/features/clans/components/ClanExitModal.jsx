import { useEffect, useState } from "react";
import { useClan } from "../context/ClanProvider";
import { useClanAccess } from "../hooks/useClanAccess";
import { useClanActions } from "../hooks/useClanActions";

export default function ClanExitModal() {
    const { activeClan: clan, setShowExitModal } = useClan();
    const { isFounder } = useClanAccess(clan);
    const { handleLeaveClan } = useClanActions(clan._id);

    const [showFounderWarning, setShowFounderWarning] = useState();
    const isPrivate = clan.access === "private";

    const onClickLeave = () => {
        if (isFounder) {
            setShowFounderWarning(true);
            return;
        }

        handleLeaveClan();
        setShowExitModal(false);
    };

    const onClickCancel = () => {
        setShowExitModal(false);
    };

    return (
        <div className="w-full max-w-lg shadow-[0_5px_30px_rgba(25,25,25,0.3)] rounded-[28px] p-8 sm:p-10 bg-white/90 backdrop-blur-3xl border border-white/80">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold leading-tight sm:text-3xl text-3xl">
                        Are you sure you want to leave {clan.name}?
                    </h1>

                    {isPrivate && (
                        <p className="text-sm leading-relaxed text-slate-500">
                            Since this is a private clan, you'll need to request
                            access again before you can rejoin.
                        </p>
                    )}
                </div>

                {/* Actions */}

                {showFounderWarning && (
                    <FounderWarning onClose={() => setShowExitModal(false)} />
                )}

                {!showFounderWarning && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClickLeave}
                            className="w-full text-base font-bold rounded-xl transition hover:bg-red-600 hover:shadow-md bg-red-500 px-6 py-3 text-white"
                        >
                            Leave
                        </button>
                        <button
                            onClick={onClickCancel}
                            className="text-base font-bold rounded-xl transition hover:bg-slate-800 hover:shadow-md bg-slate-700 px-6 py-3 text-white w-full"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function FounderWarning({ onClose }) {
    return (
        <div className="space-y-5 rounded-2xl bg-rose-50 p-5">
            <div className="space-y-2">
                <p className="font-medium text-rose 600">
                    You can't leave this clan yet.
                </p>

                <p className="text-sm leading-relaxed text-slate-600">
                    You must first transfer ownership to another user. You can
                    do this form clan management, where you can also deactivate
                    the clan.
                </p>
            </div>

            <button
                onClick={onClose}
                className="w-full rounded-xl bg-slate-700 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-800"
            >
                Okay
            </button>
        </div>
    );
}
