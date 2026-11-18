import { useNavigate } from "react-router-dom";
import Author from "../../../post/gen/Author";
import Media from "../../../post/gen/Media";
import Text from "../../../post/gen/Text";
import Avatar from "../../../user/components/Avatar";

export default function PostEntity({ entity: post }) {
    if (!post) return null;

    const navigate = useNavigate();

    const { author, media, text } = post;

    const handleOpenPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <article
            onClick={handleOpenPost}
            className="group relative w-full overflow-hidden rounded-[24px] bg-white/85 backdrop-blur-xl shadow-[0_5px_20px_rgba(15,23,42,0.06)] transition duration-200 hover:bg-white/80 hover:shadow-[0px_2px_8px_rgba(15,23,100,0.09)] cursor-pointer"
        >
            <div className="py-6 px-7">
                {/* Header */}
                <header className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <Avatar size={12} user={author} />
                        <div className="min-w-0">
                            <Author post={post} />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="mt-4">
                    {text && <Text text={text} />}
                    {media?.length > 0 && (
                        <div className="mt-4 overflow-hidden rounded-[12px] border border-white/50 max-h-100 flex items-center justify-center">
                            <Media media={media} />
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
