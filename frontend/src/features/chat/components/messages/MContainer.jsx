import { BarsArrowDown } from "../../../../components/icons/bars-arrow-down";
import { formatDate } from "../../../../utils/formatDate";
import { useScroll } from "../../hooks/useScroll";
import MessageCard from "./MessageCard";
import { MIntroCard } from "./MIntroCard";

export default function MContainer({ messages, chat, startEditing }) {
    const { containerRef, handleScroll, scrollToBottom, isNearBottom } =
        useScroll(messages);

    let timeLabel = "";
    return (
        <div className="w-full flex flex-1 flex-col justify-center min-h-0 py-2 h-full rounded-[28px] pb-8 [scrollbar-width:none]">
            <div className="relative mx-auto w-full max-w-4xl flex h-full w-full flex-1">
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex h-full min-h-0 flex-col overflow-y-auto rounded-3xl p-4 px-10 pb-20 scroll-smooth w-full lg:px-16 bg-white/40 border border-white shadow-[0_5px_40px_rgba(15,23,42,0.06)] overflow-x-hidden"
                >
                    {/* IntroCard */}
                    <MIntroCard chat={chat} />
                    {messages.map((message, index) => {
                        const prev = messages[index - 1];
                        const next = messages[index + 1];

                        const sameAsPrev = prev?.sender === message.sender;

                        const sameAsNext = next?.sender === message.sender;

                        let position = "single";

                        if (!sameAsPrev && sameAsNext) {
                            position = "top";
                        } else if (sameAsPrev && sameAsNext) {
                            position = "middle";
                        } else if (sameAsPrev && !sameAsNext) {
                            position = "bottom";
                        }

                        const lastMessage = !messages[index + 1];

                        if (lastMessage) {
                            timeLabel = formatDate(message.createdAt);
                        }
                        return (
                            <div
                                key={message._id}
                                className={`${sameAsPrev ? "mt-1.5" : "mt-7"}`}
                            >
                                <MessageCard
                                    message={message}
                                    position={position}
                                    startEditing={startEditing}
                                />

                                {lastMessage && (
                                    <p className="my-20 mb-10 w-full text-center text-xs text-slate-500">
                                        -{timeLabel} -
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
                {!isNearBottom && (
                    <button
                        onClick={scrollToBottom}
                        className="absolute right-12 lg:right-18 bottom-12 z-30 size-12 flex items-center justify-center !rounded-full !px-4 !py-2 !text-sm border border-white/60 bg-white/80 text-slate-700 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] transition-all duration-200 hover:!bg-white"
                    >
                        <BarsArrowDown />
                    </button>
                )}
            </div>
        </div>
    );
}
