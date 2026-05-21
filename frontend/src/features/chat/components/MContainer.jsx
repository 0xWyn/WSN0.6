import MessageCard from "./MessageCard";
import { MIntroCard } from "./MIntroCard";
import { useScroll } from "../hooks/useScroll";
import { NoiseTexture } from "../../../components/icons/noise";
import { BarsArrowDown } from "../../../components/icons/bars-arrow-down";
export default function MContainer({ thread, receiver }) {
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
            media: null,
        },
        {
            _id: "9ad2qi21a3b143j",
            text: "I don't care, I'm about to sleep with this hot blonde, and I just wanted you to know that I replaced the milk in the fridge with my sperm because I am doing something for my hair. Don't drink my sperm mark.",
            sender: { _id: "69a22de1na1i72t", username: "Jez", avatar: null },
            media: null,
        },
        {
            _id: "f8dtwo21a3b143t",
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
        {
            _id: "f8dtwo21a3b143kt",
            text: "In et accumsan erat. Duis vel efficitur dui. Nullam pulvinar libero odio, vitae vestibulum dui dignissim eget.",
            sender: {
                _id: "69f42b97dec3f11f03bdec01",
                username: "Mark",
                avatar: null,
            },
            media: null,
        },
        {
            _id: "f8dtwo21a3b143o",
            text: "Sed scelerisque semper finibus. Proin gravida ex tortor, in dictum nisi tristique eget.",
            sender: {
                _id: "69f42b97dec3f11f03bdec01",
                username: "Mark",
                avatar: null,
            },
            media: null,
        },
    ];

    const { containerRef, handleScroll, scrollToBottom, isNearBottom } =
        useScroll(messages);

    return (
        <div className="w-full flex flex-1 flex-col justify-center min-h-0 py-2 h-full rounded-[28px] pb-8">
            <div className="relative mx-auto w-full max-w-4xl flex h-full w-full flex-1">
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex h-full min-h-0 flex-col overflow-y-auto rounded-3xl p-4 px-10 scroll-smooth w-full lg:px-16 bg-white/40 border border-white shadow-[0_5px_40px_rgba(15,23,42,0.06)] overflow-x-hidden"
                >
                    {/* IntroCard */}
                    <MIntroCard receiver={receiver} />
                    {messages.map((message, index) => {
                        const prev = messages[index - 1];
                        const next = messages[index + 1];

                        const sameAsPrev =
                            prev?.sender?._id === message.sender._id;

                        const sameAsNext =
                            next?.sender?._id === message.sender._id;

                        let position = "single";

                        if (!sameAsPrev && sameAsNext) {
                            position = "top";
                        } else if (sameAsPrev && sameAsNext) {
                            position = "middle";
                        } else if (sameAsPrev && !sameAsNext) {
                            position = "bottom";
                        }

                        const lastMessage = !messages[index + 1];
                        return (
                            <div
                                key={message._id}
                                className={`${sameAsPrev ? "mt-1.5" : "mt-7"}`}
                            >
                                <MessageCard
                                    message={message}
                                    position={position}
                                />

                                {lastMessage && (
                                    <p className="my-8 mb-10 w-full text-center text-xs text-slate-500">
                                        - dd/mm/yy -
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
                {!isNearBottom && (
                    <button
                        onClick={scrollToBottom}
                        className="absolute right-6 bottom-8 z-30 size-12 flex items-center justify-center !rounded-full !px-4 !py-2 !text-sm border border-white/60 bg-white/80 text-slate-700 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] transition-all duration-200 hover:!bg-white"
                    >
                        <BarsArrowDown />
                    </button>
                )}
            </div>
        </div>
    );
}
