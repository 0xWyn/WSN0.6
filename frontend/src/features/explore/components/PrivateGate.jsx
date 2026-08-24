import LockKeyhole from "../../../components/icons/lock-keyhole";
import XMark from "../../../components/icons/x-mark";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useClanActions } from "../../clans/hooks/useClanActions";
import { useExplore } from "../context/ExploreProvider";

export default function PrivateGate() {
    const data = ["1", "2", "3", "4"];

    const { setShowPrivateGate, showPrivateGate: clan } = useExplore();

    const auth = useCurrentUser();

    const { handleJoinClan } = useClanActions(clan._id);

    console.log(clan);
    const requested = clan.joinRequests.find(
        ({ user }) => user._id === auth._id
    );

    return (
        <div className="h-full w-full fixed top-0 left-0 z-100">
            <div className="h-full bg-slate-900/35 backdrop-blur-xl flex items-center justify-center">
                <div className="relative w-full max-w-lg overflow-hidden bg-white/90 backdrop-blur-sm rounded-[32px] shadow-[0_25px_80px_rgba(15,23,42,.18)] border border-white flex flex-col gap-4 p-8 py py-10">
                    <button
                        className="absolute z-10 top-4 right-4 bg-white/10 hover:bg-white text-black right-4 rounded-full p-1 transition-all duration-300"
                        onClick={() => setShowPrivateGate(false)}
                    >
                        <XMark />
                    </button>
                    <div className="relative mb-10">
                        <div
                            className={`relative h-44 rounded-3xl overflow-hidden ${clan?.banner ? "" : "bg-gradient-to-br from-slate-500 to-gray-400 flex items-center justify-center transition duration-200 group"}`}
                        >
                            {clan?.banner ? (
                                <div className="w-full h-full relative">
                                    <div className="h-full w-full bg-gradient-to-b from-transparent-0 to-slate-800 opacity-50 absolute top-0" />
                                    <img
                                        src={clan?.banner.url}
                                        alt="clan banner"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <p className="font-medium tracking-wider">
                                        Banner
                                    </p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                        </div>

                        <div className="size-28 rounded-full bg-slate-100/60 backdrop-blur-lg ring-6 ring-white shadow-xl flex items-center justify-center absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 transition duration-200 group overflow-hidden">
                            {clan?.avatar && (
                                <img
                                    src={clan?.avatar.url}
                                    alt="clan avatar"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-16 text-center space-y-2">
                        <h1 className="text-3xl font-bold text-slate-900">
                            {clan?.name}
                        </h1>

                        <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm gap-2">
                            <LockKeyhole size={14} />
                            Private Clan
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-5">
                        {data.map((dat, index) => (
                            <div
                                key={dat}
                                className="rounded-full bg-slate-100 px-3 py-2 text-sm items-center"
                            >
                                {index === 0 && (
                                    <p>
                                        👥
                                        {clan?.members.length} member
                                        {clan?.members.length > 1 ? "s" : ""}
                                    </p>
                                )}
                                {index === 1 && (
                                    <p>
                                        👑
                                        {clan?.owner?.username}
                                    </p>
                                )}
                                {index === 2 && (
                                    <p>
                                        📅
                                        {new Date(clan?.createdAt)
                                            .toDateString()
                                            .split(" ")
                                            .slice(1)
                                            .join(" ")}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="rounded-2xl bg-slate-50 p-5 text-center">
                            <p className="text-base font-medium text-slate-800">
                                This clan keeps things cozy.
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                The owner reviews every request before someone
                                can join. Send a request and they'll get back to
                                you.
                            </p>
                        </div>
                    </div>

                    {!requested ? (
                        <button
                            className={`bg-gradient-to-r from-violet-500 to-indigo-500 text-white py-3 font-medium transition hover:scale-[1.02] active:scale-[.99] rounded-2xl w-full`}
                            onClick={() => handleJoinClan(clan._id)}
                        >
                            Request Access
                        </button>
                    ) : (
                        <span className="flex justify-center bg-gradient-to-r from-violet-500 to-indigo-500 text-white py-3 font-medium transition rounded-2xl w-full">
                            <span>Approval Pending</span>
                            <span className="">
                                <span className="animate-pulse [animation-delay:0ms]">
                                    .
                                </span>
                                <span className="animate-pulse [animation-delay:150ms]">
                                    .
                                </span>
                                <span className="animate-pulse[animation-delay:300ms]">
                                    .
                                </span>
                            </span>
                        </span>
                    )}

                    <button
                        onClick={() => setShowPrivateGate(false)}
                        className="w-full mt-3 text-sm text-slate-500 hover:text-slate-800"
                    >
                        {!requested ? "Maybe later " : "Cancel"}
                    </button>
                </div>
            </div>
        </div>
    );
}
