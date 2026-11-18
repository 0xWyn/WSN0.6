import { useNavigate } from "react-router-dom";
import Avatar from "../../../user/components/Avatar";
import Author from "../../../post/gen/Author";

export default function CommentEntity({ entity: comment }) {
    const { author, text, parentPost } = comment;
    const navigate = useNavigate();

    const handleCommentClick = () => {
        navigate(`/posts/${parentPost}`);
    };

    return (
        <div
            onClick={handleCommentClick}
            className="w-full h-full bg-white/40 border-white/70 backdrop-blur-md rounded-3xl p-4 flex flex-col gap-2 shadow-[0_4px_20px_rgba(140,140,140,0.1)]"
        >
            <div className="flex items-start gap-3 w-full">
                {/* Avatar */}

                <div className="outline-2 rounded-full outline-white">
                    <Avatar size={12} user={author} />
                </div>

                <div className="flex flex-col justify-center w-full">
                    <div className="flex text-sm text-slate-600 w-full justify-between">
                        <Author post={comment} type="comment" />
                    </div>
                    <div className="text-sm">{comment.text}</div>
                </div>
            </div>
        </div>
    );
}
