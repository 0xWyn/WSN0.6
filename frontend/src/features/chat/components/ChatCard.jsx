import { Link } from "react-router-dom";
import Avatar from "../../user/components/Avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import { formatDate } from "../../../utils/formatDate";

export default function ChatCard({ chat }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log(chat);
    const receiver =
        chat?.receiver ||
        chat?.participants?.find(
            (participant) => !participant?.isCurrentUser
        ) ||
        chat?.members?.find((member) => member?._id) ||
        {};
    const sender = chat.participants.find(
        (participant) => participant._id.toString() === chat.lastMessage?.sender
    );
    const lastMessage =
        chat?.lastMessage?.text ||
        chat?.latestMessage?.text ||
        chat?.messages?.[0]?.text ||
        "Say hello to start a new conversation";

    const timeLabel = formatDate(chat.updatedAt || chat.createdAt);

    return (
        <div
            onClick={() => navigate(`/chats/${chat?._id}`)}
            className="group relative block overflow-hidden rounded-[28px] border border-white/80 bg-white/50 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/60 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(15,23,42,0.08)]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_20%)]" />
            <div className="flex items-star gap-4">
                <Avatar user={receiver} size={14} />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold tracking-[0.02em] text-slate-800">
                        {receiver?.username || "Unknown"}
                    </p>
                    <div className="flex items-center gap-2">
                        {sender && (
                            <p className="text-sm">
                                {sender._id === user._id.toString()
                                    ? "You: "
                                    : `${sender.username ?? "Them"}`}
                            </p>
                        )}
                        <p className="mt-1 truncate text-sm leading-5 text-slate-400 italic">
                            {lastMessage}
                        </p>
                    </div>
                </div>
                {chat?.unreadCount > 0 && (
                    <div className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                        {chat.unreadCount}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <div
                    className={`size-2 rounded-full ${receiver?.isOnline ? "bg-emerald-400" : "bg-slate-300"} `}
                />
                <span>{timeLabel}</span>
            </div>
        </div>
    );
}
