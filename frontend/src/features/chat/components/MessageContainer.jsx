import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";

export default function MessageContainer({
    thread = [],
    onDelete = () => {},
    setIsAtBottom = () => {},
}) {
    const [isNearBottom, setIsNearBottom] = useState(true);
    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const threshold = 120;
        const position =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;
        const atBottom = position < threshold;
        setIsNearBottom(atBottom);
        setIsAtBottom(atBottom);
    };

    const scrollToBottom = () => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTop = container.scrollHeight;
    };

    useEffect(() => {
        if (isNearBottom) {
            requestAnimationFrame(scrollToBottom);
        }
    }, [thread]);

    const messages = [
        {
            _id: "9ad2qi21a3b143m",
            text: "Hi. how are you doing",
            sender: { _id: "69a22de1na1i72t", username: "Jez", avatar: null },
            media: null,
        },
        {
            _id: "f8dtwo21a3b143m",
            text: "You sodden prick",
            sender: {
                _id: "69f42b97dec3f11f03bdec01",
                username: "Mark",
                avatar: null,
            },
            media: {
                type: "image",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PN6PINu_DUPcPRnBk7YO64PS0I9x_IcUrg&s",
            },
        },
        {
            _id: "9ad2qi21a3b143m",
            text: "I don't care, I'm about to sleep with this hot blonde, and I just wanted you to know that I replaced the milk in the fridge with my sperm because I am doing something for my hair. Don't drink my sperm mark.",
            sender: { _id: "69a22de1na1i72t", username: "Jez", avatar: null },
            media: null,
        },
        {
            _id: "f8dtwo21a3b143m",
            text: "Jeremy, why are you drinking your sperm?",
            sender: {
                _id: "69f42b97dec3f11f03bdec01",
                username: "Mark",
                avatar: null,
            },
            media: {
                type: "image",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PN6PINu_DUPcPRnBk7YO64PS0I9x_IcUrg&s",
            },
        },
    ];

    return (
        <div className="relative flex-1 min-h-0">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="relative flex h-full min-h-0 flex-col gap-4 overflow-y-auto rounded-3xl bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 p-4 shadow-inner scroll-smooth"
            >
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <MessageCard message={message} key={message._id} />
                    ))
                ) : (
                    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">
                            No messages yet
                        </p>
                        <p className="max-w-sm text-sm text-slate-500">
                            Once your first message is sent, it will appear here
                            in this beautiful conversation stream.
                        </p>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            {!isNearBottom && (
                <button
                    onClick={scrollToBottom}
                    className="absolute !right-4 !bottom-4 !rounded-full bg-blue-800 !px-4 !py-2 !text-sm !text-white shadow-lg transition hover:bg-blue-900"
                >
                    ↡
                </button>
            )}
        </div>
    );
}
