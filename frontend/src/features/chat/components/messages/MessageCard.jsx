import { ChevronDown } from "../../../../components/icons/chevron-down";
import { formatDate } from "../../../../utils/formatDate";
import { useAuth } from "../../../auth/context/AuthProvider";
import { useMessageOptions } from "../../hooks/useMessageOptions.js";
import { RightBubble } from "./ChatBubbles";
import MessageMenu from "./MessageMenu";

export default function MessageCard({ message, position, startEditing }) {
    const { user } = useAuth();

    const { showMenu, toggleMenu, wrapperRef } = useMessageOptions(message._id);

    const alignRight = message.sender === user._id.toString();

    const timeLabel = formatDate(message.createdAt);

    console.log(message);

    return (
        <div
            ref={wrapperRef}
            className={`group relative flex ${alignRight ? "justify-end" : "justify-start"}`}
        >
            {alignRight && (
                <button
                    onClick={toggleMenu}
                    className="absolute z-20 !p-0 top-2 right-2 size-5 flex items-center justify-center !rounded-full bg-sky-800/20 text-white opacity-0  backdrop-blur transition-all duration-200 hover:bg-sky-800/30 hover:scale-105 active:scale-95 group-hover:opacity-100"
                >
                    <ChevronDown />
                </button>
            )}

            {showMenu && (
                <div className="absolute top-10 right-2 bg-white/80 z-30 origin-top-right  rounded-2xl border border-white/30 p-2 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
                    <MessageMenu
                        message={message}
                        startEditing={startEditing}
                    />
                </div>
            )}
            <RightBubble
                content={message.text}
                media={message.media}
                alignRight={alignRight}
                position={position}
                edited={message.edited}
                timeLabel={timeLabel}
            />
        </div>
    );
}
