import Avatar from "../../../user/components/Avatar.jsx";
import EngagementBar from "../../../engagement/components/EngagementBar.jsx";
import Author from "../../gen/Author.jsx";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal.jsx";
import { useEffect, useRef, useState } from "react";
import Text from "../../gen/Text.jsx";
import Media from "../../gen/Media.jsx";
import PostMenu from "./PostMenu.jsx";

export default function PostFocus({ post }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const { text, author, media } = post;

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu((prev) => !prev);
    };

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

    return (
        <section className="backdrop-blur-xl w-full rounded-t-[28px] py-7 px-7 sm:px-8 shrink-0 ">
            <header className="space-y-4">
                {/* header */}
                <div className="flex justify-between w-full">
                    {/* identity */}
                    <div className="flex gap-2 items-start">
                        <Avatar size={14} user={author} />
                        <Author post={post} />
                    </div>
                    {/* Button */}

                    <div
                        ref={menuRef}
                        className="relative shrink-0 backdrop-blur-xl"
                    >
                        {showMenu && (
                            <div className="absolute top-11 right-0 bg-white z-30 w-48 rounded-2xl border border-white/30 p-1.5 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
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
                </div>
            </header>

            {/* Content */}
            <div className="mt-4">
                {text && <Text text={text} />}
                {media?.length > 0 && (
                    <div className="mt-4 overflow-hidden rounded-[28px] border border-white/50">
                        <Media media={media} />
                    </div>
                )}
            </div>

            {/* Engagement */}
            <div className="border-t border-slate-100/70 pt-4 mt-5">
                <EngagementBar
                    entity={post}
                    type="post"
                    onCommentClick={() => {}}
                    disableComment
                />
            </div>
        </section>
    );
}
