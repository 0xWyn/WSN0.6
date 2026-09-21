import Author from "../../gen/Author";
import Text from "../../gen/Text";
import Avatar from "../../../user/components/Avatar";
import EngagementBar from "../../../engagement/components/EngagementBar";
import CreateComment from "./CreateComment";
import { useState } from "react";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal";
import CommentMenu from "./CommentMenu";
import { useRef } from "react";

export default function ReplyCard({ reply }) {
    if (!reply) return;
    const { author, text, likes } = reply;

    const [replying, setReplying] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    return (
        <div className="flex flex-col w-full rounded-[20px] p-2 border border-slate-100">
            <div className="flex items-start gap-3 w-full p-2">
                {/* Avatar */}
                <div className="outline-2 rounded-full outline-white">
                    <Avatar size={12} user={author} />
                </div>

                {/* Header */}
                <div className="flex flex-col justify-center w-full">
                    <div className="flex text-sm text-slate-600 w-full items-center justify-between">
                        <Author post={reply} type="comment" />

                        <div ref={menuRef} className="relative shrink-0">
                            {showMenu && (
                                <div className="absolute top-11 right-0 bg-white/98 z-30 w-48 rounded-2xl border border-white/30 p-1.5 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
                                    <CommentMenu comment={reply} />
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setShowMenu((prev) => !prev)}
                                aria-label="Post options"
                                className="flex items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <EllipsisHorizontal />
                            </button>
                        </div>
                    </div>

                    <div className="text-sm">{reply.text}</div>
                    <div className="mt-3">
                        <EngagementBar
                            object={reply}
                            type="comment"
                            onCommentClick={() => setReplying((prev) => !prev)}
                        />
                    </div>
                </div>
            </div>

            {replying && (
                <CreateComment
                    postId={reply.parentPost}
                    parentComment={reply.parentComment}
                    type="sub"
                    replyTo={reply._id}
                />
            )}
        </div>
    );
}
