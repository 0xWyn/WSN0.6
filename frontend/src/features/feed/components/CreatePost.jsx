import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Photo from "../../../components/icons/photo";
import XMark from "../../../components/icons/x-mark";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import Avatar from "../../user/components/Avatar";
import { usePostActions } from "../hooks/usePostActions";

const MAX_MEDIA = 5;

export default function CreatePost({ closeModal, clan }) {
    const { id } = useParams();
    const { handleNewPost } = usePostActions();
    const user = useCurrentUser();

    const [text, setText] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [media, setMedia] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [feedback, setFeedback] = useState("");

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
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [previews]);

    const isEmpty = !text.trim() && media.length === 0;
    const characterCount = text.length;

    const handleMediaSelection = (files) => {
        if (!files?.length) return;

        const selectedFiles = Array.from(files).filter(Boolean);
        if (!selectedFiles.length) return;

        if (media.length + selectedFiles.length > MAX_MEDIA) {
            setFeedback(`You can upload up to ${MAX_MEDIA} files at once.`);
            return;
        }

        setMedia((current) => [...current, ...selectedFiles]);
        setFeedback("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty) {
            setFeedback(
                "Add a message or at least one photo or video to post."
            );
            return;
        }

        const post = { text: text.trim(), media, clan: id };
        handleNewPost(post);
        setText("");
        setMedia([]);
        setFeedback("");
        closeModal?.();
    };

    const resize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <section className="relative flex w-full flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/70 px-8 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
                <div className="absolute left-0 top-0 size-48 rounded-full bg-amber-100/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-44 rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            <header className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Avatar user={user} />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900">
                                {user?.name || "You"}
                            </h3>
                            {/* <button
                                type="button"
                                onClick={() => alert("Setting visibility")}
                                className="h-8 w-8 flex items-center justify-center bg-slate-50 rounded-[14px] text-slate-700"
                            >
                                <Earth size={20} />
                            </button> */}
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-slate-400">
                                Posting to
                            </span>

                            <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                                {clan.name}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={closeModal}
                    className="z-30 rounded-full bg-slate-100 p-2 text-slate-400 transition-all duration-300 hover:bg-white hover:text-slate-900 hover:bg-slate-200"
                >
                    <XMark />
                </button>
            </header>

            <form
                onSubmit={handleSubmit}
                className="relative mt-4 px-2 space-y-2"
            >
                <div className="border border-slate-200/80 bg-white p-2 rounded-[20px] shadow-inner shadow-slate-100/70">
                    <textarea
                        rows={1}
                        name="text"
                        id="text"
                        value={text}
                        maxLength={280}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share an update, idea, photo, or question..."
                        className="w-full resize-none overflow-y-auto rounded-[18px] bg-transparent p-4 text-[14px] leading-7 text-slate-700 outline-none placeholder:text-slate-500 max-h-[320px]"
                        onInput={resize}
                    />
                    <div className="mt-2 flex items-center justify-between px-4 pb-1 text-xs">
                        <p className="text-slate-400">
                            Tip: add context, a photo, or a question.
                        </p>
                        {characterCount > 220 && (
                            <span
                                className={`font-medium ${
                                    characterCount > 240
                                        ? "text-amber-600"
                                        : "text-slate-400"
                                }`}
                            >
                                {characterCount}/280
                            </span>
                        )}
                    </div>
                </div>
                {/* 
                <div className="flex items-center gap-2 pt-3">
                    <label htmlFor="media">
                        <Photo />
                    </label>

                    <button type="button">😊</button>

                    <button type="button">#</button>

                    <button type="button">@</button>
                </div> */}
                {previews.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {previews.map((preview) => (
                            <div
                                key={preview.url}
                                className="group relative overflow-hidden rounded-md bg-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-2xl transition duration-300"
                            >
                                <div className="absolute left-3 top-3 z-10">
                                    <span className="rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                                        {preview.type}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/50"
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
                                {preview.type === "image" ? (
                                    <img
                                        src={preview.url}
                                        alt="preview"
                                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <video
                                        src={preview.url}
                                        controls
                                        className="h-44 w-full object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <label
                    htmlFor="media"
                    onDragEnter={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleMediaSelection(e.dataTransfer.files);
                    }}
                    className={`flex cursor-pointer items-center justify-center gap-4 rounded-2xl bg-white/70 px-4 text-center transition rounded-2xl border-2 border-dashed py-5 transition-all ${
                        isDragging
                            ? "border-sky-400 bg-sky-50/80"
                            : "border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                    <div>
                        <div
                            className="flex items-center
                         justify-center"
                        >
                            <div className="flex size-11 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                                <Photo />
                            </div>
                            <p className="text-sm font-semibold text-slate-800">
                                {media.length > 0
                                    ? `${media.length}/${MAX_MEDIA} files ready`
                                    : "Add photos or videos"}
                            </p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                            Drag and drop or browse up to {MAX_MEDIA} files
                        </p>
                    </div>
                    <input
                        type="file"
                        id="media"
                        name="media"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => {
                            handleMediaSelection(e.target.files);
                            e.target.value = "";
                        }}
                        className="hidden"
                    />
                </label>

                {feedback ? (
                    <p className="rounded-2xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
                        {feedback}
                    </p>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                            {media.length > 0 && `${media.length} selected`}
                        </span>
                        {media.length > 0 ? (
                            <span className="text-slate-400">
                                Ready to post
                            </span>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-2 ">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-full px-4 py-2 text-slate-500 hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isEmpty}
                            className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(15,23,42,0.16)] transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
