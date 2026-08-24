import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal.jsx";
import EngagementBar from "../../../engagement/components/EngagementBar.jsx";
import { usePostActions } from "../../../feed/hooks/usePostActions.js";
import Avatar from "../../../user/components/Avatar.jsx";
import Author from "../../gen/Author.jsx";
import Media from "../../gen/Media.jsx";
import Text from "../../gen/Text.jsx";
import PostMenu from "./PostMenu.jsx";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

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

    if (!post) return null;

    const { author, media, text } = post;

    const handleOpenPost = () => {
        navigate(`/posts/${post._id}`);
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu((prev) => !prev);
    };

    const { handleDeletePost } = usePostActions();

    return (
        <article
            // onKeyDown={(e) => {
            //     if (e.key === "Enter" || e.key === " ") {
            //         handleOpenPost();
            //     }
            // }}
            // onClick={handleOpenPost}
            className="group relative w-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/75 backdrop-blur-xl shadow-[0_5px_20px_rgba(15,23,42,0.06)] transition duration-200 hover:shadow-[0_8px_30px_rgba(60,62,90,0.1)] hover:bg-white hover:border-slate-100"
        >
            <div className="p-5 sm:p-6">
                {/* Header */}
                <header className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <Avatar size={10} user={author} />
                        <div className="min-w-0">
                            <Author post={post} />
                        </div>
                    </div>

                    <div ref={menuRef} className="relative shrink-0">
                        {showMenu && (
                            <div className="absolute top-11 right-0 bg-white/80 z-30 w-48 rounded-2xl border border-white/30 p-1.5 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
                                <PostMenu post={post} />
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleMenuClick}
                            aria-label="Post options"
                            className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                            <EllipsisHorizontal />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="mt-4">
                    {text && (
                        <div className="text-md leading-7 text-slate-700">
                            {text}
                        </div>
                    )}
                    {media?.length > 0 && (
                        <div className="mt-4 overflow-hidden rounded-[28px]">
                            <Media media={media} />
                        </div>
                    )}
                </div>

                {/* Engagement */}
                <div className="mt-4 border-t border-slate-100 pt-2">
                    <EngagementBar
                        object={post}
                        type="post"
                        onCommentClick={handleOpenPost}
                    />
                </div>
            </div>
        </article>
    );
}
