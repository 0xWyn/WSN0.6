import { useState } from "react";
import ChatBubble from "../../../components/icons/chatbubble";
import HeartIcon from "../../../components/icons/heartII";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useEngagement } from "../hooks/useEngagement";

export default function EngagementBar({
    entity,
    type,
    onCommentClick,
    disableComment = false,
}) {
    if (!entity) return;
    const { likeCount, replyCount, isLiked } = entity;
    const { like } = useEngagement(entity._id, type);

    const buttons = [
        {
            title: "likes",
            icon: <HeartIcon isLiked={isLiked} />,
            onClick: like,
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
            className={`${type === "comment" ? "flex items-center gap-8" : "flex items-center gap-4"} pointer-events-auto`}
        >
            {buttons.map(({ title, icon, onClick, value, disabled }) => (
                <button
                    key={title}
                    className={`group flex items-center gap-2 rounded-full !cursor-default ${type === "post" && !disabled && "!cursor-pointer border border-white/70 px-3.5 py-2 backdrop-blur-md shadow-[0_4px_14px_rgba(15,23,42,0.02)] hover:bg-white/80 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"} transition-all duration-200 `}
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
