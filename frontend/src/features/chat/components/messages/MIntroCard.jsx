import { formatDate } from "../../../../utils/formatDate";
import Avatar from "../../../user/components/Avatar";
import { useFeed } from "../../../feed/context/FeedProvider";

export const MIntroCard = ({ chat }) => {
    const { receiver, createdAt } = chat;
    const { entities } = useFeed();
    const timeLabel = formatDate(createdAt);
    const user = entities.users[receiver._id] || {};
    const { following, followers } = user;
    return (
        <div className="flex w-full justify-center px-8 py-4 md:mb-10 md:px-20">
            <div
                className="relative flex flex-col w-full max-w-xs gap-3 rounded-[28px] items-center border border-slate-200/70 bg-gradient-to-br from-white/20 to-slate-50/20  px-5 md:px-7 py-6 md:py-8 mb-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl
            
            before:absolute before:left-1/2 before:top-0 before:h-32 before:w-[80%] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_top,rgba(96,165,250,.15),transparent_70%)]  before:blur-2xl"
            >
                <Avatar user={receiver ?? null} size={20} />
                <div className="flex flex-col w-full items-center gap-2">
                    <p className="text-sm md:text-base font-semibold text-slate-700">
                        @{receiver.username}
                    </p>

                    <div className="flex gap-3 md:gap-6">
                        <div className="flex flex-col items-center justify-center my-6">
                            <p className="text-5xl text-slate-300">
                                {followers?.length ?? "?"}
                            </p>
                            <p className="text-xs text-slate-500">followers</p>
                        </div>
                    </div>
                </div>

                <div className=" text-center flex flex-col items-center gap-2 text-xs md:text-sm text-slate-400 ">
                    <p className="">Chat started: {timeLabel}</p>
                </div>
            </div>
        </div>
    );
};
