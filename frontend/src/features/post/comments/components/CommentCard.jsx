import { useEffect, useState } from "react";
import EngagementBar from "../../../engagement/components/EngagementBar";
import { useFeed } from "../../../feed/context/FeedProvider";
import { useHydratePost } from "../../../feed/utils/useHydratePost";
import { useEntities } from "../../../global/EntityProvider";
import Avatar from "../../../user/components/Avatar";
import Author from "../../gen/Author";
import { useComments } from "../hooks/useComments";
import CreateComment from "./CreateComment";
import ReplyCard from "./ReplyCard";
import CommentMenu from "./CommentMenu";
import { useRef } from "react";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal";

export default function CommentCard({ comment }) {
    const { author, text } = comment;

    const [open, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const { queries } = useFeed();
    const { entities } = useEntities();
    const { hydratePost } = useHydratePost();

    const { loadingComments, loadReplies } = useComments();

    useEffect(() => {
        if (open) {
            loadReplies(comment._id);
        }
    }, [comment._id, open]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const replyIds = queries.repliesByComment?.[comment._id] || [];

    const mappedReplies = replyIds.map((id) => (
        <div key={id}>
            <ReplyCard reply={hydratePost(entities.comments[id])} />
        </div>
    ));

    const handleCommentClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <div className="w-full h-full  rounded-3xl p-4 flex flex-col gap-2 shadow-[0_4px_20px_rgba(140,140,140,0.1)]">
                <div className="flex items-start gap-3 w-full">
                    {/* Avatar */}

                    <div className="outline-2 rounded-full outline-white">
                        <Avatar size={12} user={author} />
                    </div>

                    <div className="flex flex-col justify-center w-full">
                        <div className="flex text-sm text-slate-600 w-full justify-between">
                            <Author post={comment} type="comment" />

                            <div ref={menuRef} className="relative shrink-0">
                                {showMenu && (
                                    <div className="absolute top-11 right-0 bg-white/98 z-30 w-48 rounded-2xl border border-white/30 p-1.5 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
                                        <CommentMenu comment={comment} />
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

                        <div className="text-sm">{comment.text}</div>

                        <div className="mt-3">
                            <EngagementBar
                                object={comment}
                                type="comment"
                                onCommentClick={handleCommentClick}
                            />
                        </div>
                    </div>
                </div>

                {open && (
                    <div className="flex flex-col ml-10 gap-3">
                        <CreateComment
                            postId={comment.parentPost}
                            parentComment={comment._id}
                            type="sub"
                            replyTo={comment._id}
                        />
                        {loadingComments.sub && <div>Loading...</div>}

                        {!loadingComments.sub && replyIds.length > 0 && (
                            <div className="flex flex-col space-y-2 mt-2">
                                {mappedReplies}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
