import Avatar from "../../../user/components/Avatar.jsx";
import EngagementBar from "../../../engagement/components/EngagementBar.jsx";
import Author from "../../gen/Author.jsx";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal.jsx";

import { useEffect, useRef, useState } from "react";

export default function PostFocus({ post }) {
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
    return (
        <section className="backdrop-blur-xl w-full rounded-t-[28px] py-7 px-7 sm:px-8 shrink-0 ">
            <div className="space-y-4">
                {/* header */}
                <div className="flex justify-between w-full">
                    {/* identity */}
                    <div className="flex gap-2 items-start">
                        <Avatar size={14} user={post.author} />
                        <Author post={post} />
                    </div>
                    {/* Button */}
                    <button>
                        <EllipsisHorizontal />
                    </button>
                </div>
                {/* Content */}
                <p className="leading-tall">{post.text}</p>
            </div>

            {/* Engagement */}
            <div className="border-t border-slate-100/70 pt-4 mt-5">
                <EngagementBar
                    object={post}
                    type="post"
                    onCommentClick={() => {}}
                />
            </div>
        </section>
    );
}
