import { useNavigate, useParams } from "react-router-dom";
import { useClan } from "../../context/ClanProvider";
import XMark from "../../../../components/icons/x-mark";
import { useEntities } from "../../../global/EntityProvider";
import { useClanActions } from "../../hooks/useClanActions";

export default function RequestControls({ onClose }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { activeClan } = useClan();

    const { handleAcceptRequest, handleRejectRequest, loadingClanActions } =
        useClanActions(activeClan._id);

    const onAccept = async () => {
        try {
            await handleAcceptRequest(id);

            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const onReject = async () => {
        try {
            await handleRejectRequest(id);

            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <div className="z-100 flex-1 flex justify-center w-full h-full relative">
            {/* Main Child */}
            <div className="fixed bottom-10 w-full max-w-3xl rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-2 pb-3">
                    <h1 className="font-medium text-sm uppercase tracking-widest text-slate-400">
                        Clan request
                    </h1>

                    <p className="mt-0.5 text-lg font-medium text-slate-800">
                        Review membership request
                    </p>
                    <button
                        className="text-slate-400 hover:bg-slate-100 transition duration-300 rounded-full p-2 hover:text-slate-700 active:scale-[0.95]"
                        aria-label="Close review"
                        onClick={closeModal}
                    >
                        <XMark size={20} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onReject}
                        className="flex-1 rounded-2xl border border-rose-200/80 bg-rose-50/50 px-4 py-3 text-sm font-medium text-rose-600 shadow-sm transition-all duration-200 hover:bg-rose-100 hover:shadow-md active:scale-[0.98]"
                    >
                        Decline
                    </button>
                    <button
                        onClick={onReject}
                        className="flex-1 rounded-2xl border border-sky-300/70 bg-sky-500 px-4 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(55,189,248,0.25)] transition-all duration-200 hover:bg-sky-600 hover:shadow-[0_10px_25px_rgba(56,189,248,0.3)] active:scale-[0.98]"
                    >
                        Accept
                    </button>
                </div>

                {loadingClanActions.handlingRequest && (
                    <div className="animate-spin border-r-transparent border-4 size-10"></div>
                )}
            </div>
        </div>
    );
}
