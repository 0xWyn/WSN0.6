import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import Avatar from "../../user/components/Avatar";
import Photo from "../../../components/icons/photo";
import XMark from "../../../components/icons/x-mark";

export default function CreatePost({ onSubmit }) {
    const [text, setText] = useState("");
    const [media, setMedia] = useState([]);
    const { user } = useAuth();
    const previews = useMemo(
        () =>
            media.map((file) => ({
                type: file.type.startsWith("video") ? "video" : "image",
                file,
                url: URL.createObjectURL(file),
            })),
        [media]
    );

    useEffect(() => {
        return () => {
            previews.forEach((p) => URL.revokeObjectURL(p.url));
        };
    }, [previews]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() && !media.length) return;

        const post = { text, media };
        onSubmit(post);
        setText("");
        setMedia([]);
    };

    const resize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <section className="relative overflow-hidden flex w-full flex-col gap-4 rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
                <div className="absolute left-0 top-0 size-52 rounded-full bg-amber-100/20 blur-3xl" />
                <div className="absolute right-0 bottom-0 size-40 rounded-full bg-sky-100/20 blur-3xl" />
            </div>
            <div className="flex gap-5 relative z-10">
                <div className="pt-1">
                    <Avatar size={20} user={user} />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">
                        Share an update
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-3 flex flex-col gap-4"
                    >
                        <textarea
                            rows={1}
                            name="text"
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Share something..."
                            className="min-h-[129px] w-full resize-none bg-transparent px-1 py-2 text-[15px] leading-7 text-slate-700 placeholder:text-slate-400 outline-none"
                            onInput={resize}
                        />

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />

                        <div className="flex flex-wrap items-center justify-between pt-1">
                            <label
                                htmlFor="media"
                                className="flex items-center gap-2 rounded-full bg-white/50 border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/80 hover:text-slate-900 
                                hover:shadow-[0_6px_20px_rgba(15,23,42,0.06)]
                                cursor-pointer"
                            >
                                <Photo />
                                Add photo/video
                                <input
                                    type="file"
                                    id="media"
                                    name="media"
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        if (media.length >= 5) {
                                            alert("Max uploads reached");
                                            e.target.value = "";
                                            return;
                                        }

                                        setMedia((current) => [
                                            ...current,
                                            file,
                                        ]);
                                        e.target.value = "";
                                    }}
                                    className="hidden"
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={!text.trim() && !media.length}
                                className="!rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition-all duration-200
                                hover:translate-y-[-1px] hover:bg-slate-800 disabled:opacity-40"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {previews.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pt-2">
                    {previews.map((preview) => (
                        <div
                            key={preview.url}
                            className="group relative h-40 w-52 shrink-0 overflow-hidden rounded-[24px] border border-white/50 bg-white/40 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
                        >
                            {preview.type === "image" ? (
                                <Link to={preview.url} target="_blank">
                                    <img
                                        src={preview.url}
                                        alt="preview"
                                        className="h-full w-full object-contain bg-slate-100"
                                    />
                                </Link>
                            ) : (
                                <video
                                    src={preview.url}
                                    controls
                                    className="h-full w-full object-cover"
                                />
                            )}
                            <button
                                type="button"
                                className="absolute right-3 top-3 flex text-white size-8 justify-center items-center !p-0 !rounded-full !bg-black/30 backdrop-blur-md transition-all duration-200 hover:bg-black/50 hover:scale-105"
                                onClick={() => {
                                    setMedia((prev) =>
                                        prev.filter(
                                            (file) => file !== preview.file
                                        )
                                    );
                                }}
                            >
                                <XMark />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
