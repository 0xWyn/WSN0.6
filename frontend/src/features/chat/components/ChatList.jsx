import LocNav from "../../../components/ui/LocNav";
import { useChat } from "../context/ChatProvider";
import ChatCard from "./ChatCard";
import { useAuth } from "../../auth/context/AuthProvider";
export default function ChatList() {
    const { user } = useAuth();
    const { chatIds, chatsById, loadingChats } = useChat();

    return (
        <div className="relative w-full h-full min-h-0 border overflow-hidden bg-[#f8fafc] rounded-3xl">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-0 size-[32rem] rounded-full bg-amber-100/20 blur-3xl" />

                <div className="absolute bottom-0 right-0 size-[26rem] rounded-full bg-sky-200/20 blur-3xl" />
            </div>
            <LocNav current="Chats" />

            <div className="w-full p-4 mx-auto flex max-w-6xl flex-col gap-4 h-full">
                <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/40 p-5 backdrop-blur-2xl shadow-[0_10px_20px_rgba(15,23,42,0.08)] flex flex-col">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_55%)]" />
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl tracking-[-0.03em] font-semibold text-slate-800">
                                Messages
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Continue where you left off.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button className="!rounded-2xl bg-white/70 !px-4 !py-2 text-sm !text-slate-700 font-semibold backdrop-blur-xl !transition-all duration-200 hover:bg-white hover:shadow-[0_4px_20px_rgba(15,23,42,0.08)]">
                                New chat
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        {loadingChats ? (
                            <div className="rounded-3xl bg-slate-100 p-8 text-center text-slate-500">
                                Loading chats...
                            </div>
                        ) : chatIds.length > 0 ? (
                            chatIds.map((id) => (
                                <ChatCard key={id} chat={chatsById[id]} />
                            ))
                        ) : (
                            <div className="rounded-3xl bg-slate-100 p-8 text-center text-slate-500">
                                No chats yet. Start a conversation to get going.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
