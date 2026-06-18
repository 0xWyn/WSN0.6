import { useState } from "react";
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

    const handleMenuClick = () => {
        console.log("Clicked menu button");
        setShowMenu((prev) => !prev);
    };
    if (!post) return null;

    const { author, media, text } = post;

    const handleOpenPost = () => navigate(`/posts/${post._id}`);
    const { handleDeletePost } = usePostActions();

    return (
        <article
            className="group relative w-full overflow-hidden rounded-[32px] border border-white/60 bg-white/40 backdrop-blur-3xl
        
        shadow-[0_4px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_16px_60px_rgba(15,23,42,0.10)] hover:bg-white/60"
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
                <div className="absolute left-1/7 top-0 size-52 rounded-full bg-amber-100/20 blur-2xl overflow-hidden" />

                <div className="absolute bottom-0 right-0 size-40 rounded-full bg-sky-100/20 blur-xl" />
            </div>

            <div className="relative z-100 flex flex-col gap-6 p-6 md:p-7 pointer-events-auto">
                {/* Header */}
                <div className="flex items-start w-full justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar size={12} user={author} />
                        <div className="min-w-0">
                            <Author post={post} />
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            console.log("Clicked");
                            setShowMenu((prev) => !prev);
                        }}
                        className="!px-10 !z-30 !pointer-events-auto"
                    >
                        <EllipsisHorizontal />
                    </button>
                </div>

                {showMenu && (
                    <div className="absolute top-20 right-2 bg-white/80 z-30 origin-top-right  rounded-2xl border border-white/30 p-2 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
                        <PostMenu post={post} />
                    </div>
                )}

                {/* Content */}
                <div onClick={handleOpenPost} className="flex flex-col gap-4">
                    <Text text={text} />
                    {post.media.length > 0 && (
                        <div className="overflow-hidden rounded-[28px]">
                            <Media media={post.media} />
                        </div>
                    )}
                </div>

                <div className="flex gap-4 border-white/40 pt-5 z-20 group">
                    <EngagementBar
                        value={post}
                        type="post"
                        onCommentClick={handleOpenPost}
                    />
                </div>
            </div>
        </article>
    );
}
