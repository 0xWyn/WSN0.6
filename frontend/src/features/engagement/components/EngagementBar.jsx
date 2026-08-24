import ChatBubble from "../../../components/icons/chatbubble";
import HeartIcon from "../../../components/icons/heartII";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useEngagement } from "../hooks/useEngagement";

export default function EngagementBar({ object, type, onCommentClick }) {
    if (!object) return;
    const user = useCurrentUser();
    const isLiked = object.likes.includes(user._id);
    const { like } = useEngagement(object._id, type);

    const handleLike = async () => {
        await like();
    };

    const buttons = [
        {
            title: "likes",
            icon: <HeartIcon isLiked={isLiked} />,
            onClick: handleLike,
            value: object.likes.length,
        },
        {
            title: "comments",
            icon: <ChatBubble />,
            onClick: onCommentClick,
            value: object.replies.length,
        },
    ];
    return (
        <div
            className={`${type === "comment" ? "flex items-center gap-8" : "flex items-center gap-4"} pointer-events-auto`}
        >
            {buttons.map(({ title, icon, onClick, value }) => (
                <button
                    key={title}
                    className={`group flex items-center gap-2 rounded-full ${type === "post" && "border border-white/70  px-3.5 py-2 backdrop-blur-md shadow-[0_4px_14px_rgba(15,23,42,0.06)] hover:bg-white/80 hover:shadow-[0_8px_24px_rgba(15,23,42,0.10)]"} hover:scale-[1.03] transition-all duration-200 `}
                    onClick={onClick}
                >
                    {icon}

                    <span className="text-sm text-slate-500 group-hover:text-slate-800 transition duration-300">
                        {value}
                    </span>
                </button>
            ))}
        </div>
    );
}
