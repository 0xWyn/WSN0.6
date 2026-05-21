import { useState } from "react";
import { useAuth } from "../../auth/context/AuthProvider";
import { useEngagement } from "../hooks/useEngagement";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";

export default function EngagementBar({ value, type, onCommentClick }) {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(value.likes.includes(user._id));
    const { like } = useEngagement(value._id, type);

    const handleLike = async () => {
        await like();
        setIsLiked((prev) => !prev);
    };

    const buttons = [
        {
            Component: LikeButton,
            props: {
                // handleLike,
                isLiked,
            },
            count: value.likes.length,
        },
        {
            Component: CommentButton,
            props: {
                // onCommentClick,
            },
            count: value.replyCount,
        },
    ];
    return (
        <div className="flex gap-3 pt-2 items-center pointer-events-auto z-20">
            {buttons.map(({ Component, props, count }, index) => (
                <div
                    key={index}
                    className="group flex items-center gap-2 rounded-full bg-white/40 border border-white/70 px-3.5 py-2 backdrop-blur-md 
                    shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-all duration-100 hover:scale-[1.03] hover:bg-white/80
                    hover:shadow-[0_8px_24px_rgba(15,23,42,0.10)]"
                    onClick={
                        Component === LikeButton ? handleLike : onCommentClick
                    }
                >
                    <Component {...props} />
                    <span className="text-sm font-medium text-slate-600">
                        {count}
                    </span>
                </div>
            ))}
        </div>
    );
}
