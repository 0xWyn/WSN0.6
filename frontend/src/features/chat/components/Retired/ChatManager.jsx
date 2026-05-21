import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resolveChat } from "../../hooks/resolveChat";

const MIN_LOADING_TIME = 2500;
const TOAST_DURATION = 3500;

export default function ChatResolver() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState({
        visible: false,
        message: "",
    });

    const toastTimeoutRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const resolve = async () => {
            const start = Date.now();

            try {
                const data = await resolveChat(id);
                navigate(`/chats/${data._id}`);
                const elapsed = Date.now() - start;
                const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

                setTimeout(() => {
                    if (!mounted) return;

                    // navigate(`/chats/${data._id}`);
                    setLoading(false);
                }, remaining);
            } catch (error) {
                console.error(error);

                const elapsed = Date.now() - start;
                const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);

                setTimeout(() => {
                    if (!mounted) return;

                    setLoading(false);

                    showError("Failed to initialise chat. Please try again.");
                }, remaining);
            }
        };

        resolve();

        return () => {
            mounted = false;
            clearTimeout(toastTimeoutRef.current);
        };
    }, [id]);

    const showError = (message) => {
        clearTimeout(toastTimeoutRef.current);

        setError({
            visible: true,
            message,
        });

        toastTimeoutRef.current = setTimeout(() => {
            setError((prev) => ({
                ...prev,
                visible: false,
            }));

            setTimeout(() => {
                setError({
                    visible: false,
                    message: "",
                });
            }, 500);
        }, TOAST_DURATION);
    };

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
            {/* Ambient background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-400 blur-3xl" />
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="relative flex flex-col items-center gap-6">
                    {/* Spinner */}
                    <div className="relative flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full border-4 border-slate-200" />

                        <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-blue-600 border-r-violet-500" />

                        <div className="absolute h-10 w-10 rounded-full bg-white shadow-inner" />
                    </div>

                    {/* Loading text */}
                    <div className="space-y-2 text-center">
                        <p className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 bg-clip-text text-sm font-black uppercase tracking-[0.35em] text-transparent">
                            Opening Chat
                        </p>

                        <p className="text-sm text-slate-500">
                            Preparing your conversation...
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative flex flex-col items-center gap-4 text-center">
                    {/* Error Icon */}
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-red-200 bg-white shadow-xl shadow-red-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-3xl text-white">
                            !
                        </div>
                    </div>

                    {/* Error Text */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tight text-slate-800">
                            Chat Unavailable
                        </h2>

                        <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                            We couldn't initialise this conversation right now.
                        </p>
                    </div>

                    {/* Retry */}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Toast */}
            {error.message && (
                <div
                    className={`
                        absolute top-6
                        flex items-center gap-3
                        rounded-2xl border border-red-200
                        bg-white/90 backdrop-blur-xl
                        px-5 py-4
                        shadow-2xl shadow-red-100
                        transition-all duration-500
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${
                            error.visible
                                ? "translate-y-0 opacity-100 scale-100"
                                : "-translate-y-10 opacity-0 scale-95"
                        }
                    `}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                        !
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                        {error.message}
                    </p>
                </div>
            )}
        </div>
    );
}
