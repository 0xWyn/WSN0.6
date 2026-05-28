import { formatDate } from "../../../utils/formatDate";
import Avatar from "../../user/components/Avatar";
import { useFeed } from "../../feed/context/FeedProvider";
import { useEntities } from "../../global/EntityProvider";

export const MIntroCard = ({ chat }) => {
    const { receiver, createdAt } = chat;
    const { entities } = useEntities();
    const timeLabel = formatDate(createdAt);
    const user = entities.users[receiver?._id] || {};

    return (
        <div className="flex w-full justify-center px-8 py-4 md:mb-10 md:px-20">
            <div
                className="relative flex flex-col w-full max-w-xs gap-3 rounded-[28px] items-center border border-white/70 bg-gradient-to-br from-white/20 to-slate-50/20 px-5 md:px-7 py-6 md:py-8 mb-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl
            
            before:absolute before:left-1/2 before:top-0 before:h-32 before:w-[80%] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_top,rgba(96,165,250,.25),transparent_70%)]  before:blur-2xl"
            >
                <Avatar user={receiver ?? null} size={16} />
                <div className="flex flex-col w-full items-center gap-2">
                    <p className="text-sm font-semibold text-slate-700">
                        @{receiver?.username}
                    </p>

                    <p className="text-xs md:text-sm text-slate-400 ">
                        Conversation started{" "}
                        <span className="text-base">•</span> {timeLabel}
                    </p>
                </div>
            </div>
        </div>
    );
};
