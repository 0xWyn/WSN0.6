import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useClan } from "../../../context/ClanProvider";
import { useClanActions } from "../../../hooks/useClanActions";
import XMark from "../../../../../components/icons/x-mark";
import UserKey from "../../../../../components/icons/user-key";
import { useClanManagement } from "../../../context/ClanManagementProvider";
import { useClanSettings } from "../../../hooks/useClanSettings";

export default function ModeratorList({ onCancel, onBack }) {
    const { activeClan: clan } = useClan();

    const [selected, setSelected] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [response, setResponse] = useState("");
    const [succeeded, setSucceeded] = useState(null);

    const { handleOwnershipTransfer } = useClanActions(clan._id);
    const { fetchClanLeaders, loadingClanSettings } = useClanSettings(clan._id);

    const { leaders } = useClanManagement();

    useEffect(() => {
        fetchClanLeaders();
    }, []);

    const handleContinue = async () => {
        if (!selected || submitting) return;
        try {
            setSubmitting(true);
            const data = await handleOwnershipTransfer(selected);
            handleResponse(data);
        } finally {
            setSubmitting(false);
        }
    };

    const handleResponse = (result) => {
        const statements = {
            success: `Transfer request was successful. Pending acceptance from the selected leader.`,
            failure: `Transfer request was snot successful, please try again`,
        };
        result === "success" ? setSucceeded(true) : setSucceeded(false);
        setResponse(statements[result]);
    };
    const showList = Object.values(leaders)?.length > 0 || false;

    const requestedLeader = succeeded ? leaders[selected] : null;

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
                {/* Notice */}
                {response ? (
                    <div
                        className={`mx-6 mt-5 relative gap-3 rounded-2xl border ${succeeded ? "border-emerald-200/70 bg-emerald-50/60 text-emerald-900" : "border-rose-200/70 bg-rose-50/60 text-rose-900"} sm:mx-8 overflow-hidden`}
                    >
                        <div
                            className={`border-l-4 ${succeeded ? "border-emerald-200" : "border-rose-200"} px-6 py-4`}
                        >
                            <p className="text-xs leading-relaxed">
                                {/* <span className="font-semibold">
                                This decision matters.
                            </span> */}
                                {response}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mx-6 mt-5 relative gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/60  sm:mx-8 overflow-hidden">
                        <div className="border-l-4 border-amber-200 px-6 py-4">
                            <p className="text-xs leading-relaxed text-amber-900">
                                <span className="font-semibold">
                                    This decision matters.
                                </span>
                                The new owner will gain ownership privileges.
                                Choose someone you trust to lead the community.
                            </p>
                        </div>
                    </div>
                )}

                {loadingClanSettings.fetchLeaders ? (
                    <section className="rounded-[20px] bg-white/30 mx-6 my-10 text-center mx-6 mb-4 sm:mx-6">
                        <div className="">
                            <div className="opacity-20">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-sky-200/20 blur-3xl"
                                />
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -bottom-12 -left-10 size-32 rounded-full bg-amber-200/20 blur-3xl"
                                />
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        {/* List heading */}
                        <div className="flex items-center justify-between px-6 pb-2 pt-6 sm:px-8">
                            <div>
                                {!requestedLeader ? (
                                    <>
                                        <h2 className="text-sm font-semibold text-slate-800">
                                            Choose a successor
                                        </h2>
                                        {!requestedLeader && (
                                            <p
                                                className={`mt-1 text-xs text-slate-400`}
                                            >
                                                Select one clan leader
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p
                                            className={`mt-1 text-xs text-slate-600`}
                                        >
                                            You have chosen{" "}
                                            <span className="text-xs font-semibold text-slate-800">
                                                @{requestedLeader.username}
                                            </span>{" "}
                                            to be your successor.
                                        </p>
                                    </>
                                )}
                            </div>
                            {!requestedLeader && (
                                <span className="rounded-full border border-slate-200/70 bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-500">
                                    {Object.values(leaders).length}
                                </span>
                            )}
                        </div>

                        {/* Selected Leader */}
                        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 sm:px-6">
                            {requestedLeader ? (
                                <div
                                    className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 focus-visible:outline-none !font-normal focus-visible:ring-2 focus-visible:ring-sky-400 bg-emerald-100/20 border-emerald-600/50 `}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] transition-colors bg-gradient-to-br from-sky-200 to-sky-300 bg-gradient-to-br from-amber-100 to-sky-100`}
                                    >
                                        {requestedLeader.avatar?.url ? (
                                            <img
                                                src={requestedLeader.avatar.url}
                                                alt=""
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm font-semibold text-slate-700">
                                                {requestedLeader.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    {/* Identity */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-medium text-slate-800">
                                            {requestedLeader.name}
                                        </h3>
                                        <p className="mt-0.5 truncate text-xs text-slate-500">
                                            @{requestedLeader.username}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {Object.values(leaders).length > 0 ? (
                                        Object.values(leaders).map(
                                            (moderator) => {
                                                const isSelected =
                                                    selected === moderator._id;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={moderator._id}
                                                        onClick={() =>
                                                            setSelected(
                                                                moderator._id
                                                            )
                                                        }
                                                        aria-pressed={
                                                            isSelected
                                                        }
                                                        className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 focus-visible:outline-none !font-normal focus-visible:ring-2 focus-visible:ring-sky-400 ${isSelected ? "border-sky-300 bg-sky-50/80 shadow-sm shadow-sky-900/5" : "border-transparent bg-white/40 hover:border-slate-200/80 hover:bg-white/80"}`}
                                                    >
                                                        {/* Avatar */}
                                                        <div
                                                            className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] transition-colors ${isSelected ? "bg-gradient-to-br from-sky-200 to-sky-300" : "bg-gradient-to-br from-amber-100 to-sky-100"}`}
                                                        >
                                                            {moderator.avatar
                                                                ?.url ? (
                                                                <img
                                                                    src={
                                                                        moderator
                                                                            .avatar
                                                                            .url
                                                                    }
                                                                    alt=""
                                                                    className="size-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-sm font-semibold text-slate-700">
                                                                    {moderator.name
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* Identity */}
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="truncate text-sm font-medium text-slate-800">
                                                                {moderator.name}
                                                            </h3>
                                                            <p className="mt-0.5 truncate text-xs text-slate-500">
                                                                @
                                                                {
                                                                    moderator.username
                                                                }
                                                            </p>
                                                        </div>
                                                        {/* Selection indicator */}
                                                        <div
                                                            className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${isSelected ? "border-sky-500 bg-sky-500 text-white" : "border-slate-300 bg-white/70 text-transparent group-hover:border-slate-400"} ${succeeded && "opacity-0"}`}
                                                        >
                                                            <svg
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                className="size-3"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    d="m5 10 3.2 3.2L15 6.5"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                );
                                            }
                                        )
                                    ) : (
                                        <section className="relative mb-2 overflow-hidden rounded-[20px] bg-white/30 px-6 py-10 text-center">
                                            <div className="opacity-20">
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-sky-200/20 blur-3xl"
                                                />
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -bottom-12 -left-10 size-32 rounded-full bg-amber-200/20 blur-3xl"
                                                />
                                            </div>
                                            <div className="relative mx-auto flex size-12 items-center justify-center rounded-[20px] text-slate-600 shadow-sm shadow-slate-900/5">
                                                <UserKey size={20} />
                                            </div>
                                            <h3 className="relative mt-4 text-sm font-semibold text-slate-800">
                                                No leaders yet
                                            </h3>
                                            <p className="relative mx-auto mt-1.5 max-w-[240px] text-xs leading-relaxed text-slate-500">
                                                Your clan needs a moderator
                                                before you can transfer
                                                ownership. Promote a trusted
                                                member to get started.
                                            </p>
                                        </section>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-200/60 cpx-6 py-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <button
                        type="button"
                        onClick={succeeded ? onCancel : onBack}
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-white/80 hover:text-slate-800"
                    >
                        {succeeded ? "Close" : "Back"}
                    </button>
                    {showList && !response && (
                        <button
                            type="button"
                            disabled={!selected || submitting}
                            onClick={handleContinue}
                            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                        >
                            {submitting ? "Processing..." : "Continue"}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
