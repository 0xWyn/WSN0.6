import ChatBubble from "../../../components/icons/chatbubble";
import HeartIcon from "../../../components/icons/heartII";
import { useEngagement } from "../hooks/useEngagement";

export default function EngagementBar({
    entity,
    type,
    onCommentClick,
    disableComment = false,
}) {
    if (!entity) return;
    const { likeCount, replyCount, isLiked, _id } = entity;
    const { like, unlike } = useEngagement(type, _id);

    const buttons = [
        {
            title: "likes",
            icon: <HeartIcon isLiked={isLiked} />,
            onClick: isLiked ? unlike : like,
            value: likeCount,
            disabled: false,
        },
        {
            title: "comments",
            icon: <ChatBubble />,
            onClick: onCommentClick,
            value: replyCount,
            disabled: disableComment,
        },
    ];
    return (
        <div
            className={`${type === "comment" ? "flex items-center gap-8" : "flex items-center gap-8"} pointer-events-auto`}
        >
            {buttons.map(({ title, icon, onClick, value, disabled }) => (
                <button
                    key={title}
                    className={`group flex items-center gap-2 rounded-full !cursor-default ${type === "post" && !disabled && "!cursor-pointer border border-white/70 backdrop-blur-md shadow-[0_4px_14px_rgba(15,23,42,0.01)] hover:bg-white/80 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"} transition-all duration-200 px-2 py-1`}
                    onClick={onClick}
                >
                    {icon}

                    <span className="text-sm text-slate-400 group-hover:text-slate-800 transition duration-300 !font-normal">
                        {value}
                    </span>
                </button>
            ))}
        </div>
    );
}
