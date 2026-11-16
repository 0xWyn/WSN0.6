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
            className="group relative w-full overflow-hidden rounded-[24px] bg-white/75 backdrop-blur-xl shadow-[0_5px_20px_rgba(15,23,42,0.06)] transition duration-200 hover:shadow-[0_8px_30px_rgba(60,62,90,0.1)] hover:bg-white hover:border-slate-100"
        >
            <div className="p-6">
                {/* Header */}
                <header className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <Avatar size={10} user={author} />
                        <div className="min-w-0">
                            <Author post={post} />
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
            </div>
        </article>
    );
}
