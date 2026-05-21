import Avatar from "../../user/components/Avatar";

export const MIntroCard = ({ receiver }) => {
    return (
        <div className="flex w-full justify-center px-8 py-4 md:mb-10 md:px-20">
            <div
                className="relative flex flex-col w-full max-w-xs gap-3 rounded-[28px] items-center border border-slate-200/70 bg-gradient-to-br from-white/20 to-slate-50/20  px-5 md:px-7 py-6 md:py-8 mb-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl
            
            before:absolute before:left-1/2 before:top-0 before:h-32 before:w-[80%] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_top,rgba(96,165,250,.15),transparent_70%)]  before:blur-2xl"
            >
                <Avatar user={receiver ?? null} size={20} />
                <div className="flex flex-col w-full items-center gap-2">
                    <p className="text-sm md:text-base font-semibold text-slate-700">
                        @username
                    </p>

                    <div className="flex gap-3 md:gap-6">
                        <div className="size-15 border bg-slate-200 border-slate-300 rounded-md shadow-xs" />
                        <div className="size-15 border bg-slate-200 border-slate-300 rounded-md shadow-xs" />
                    </div>
                </div>

                <div className=" text-center flex flex-col items-center gap-2 text-xs md:text-sm text-slate-400 ">
                    <p className="">You are now chatting with @username</p>
                    <p className="">Chat started: dd/mm/yy</p>
                </div>
            </div>
        </div>
    );
};
