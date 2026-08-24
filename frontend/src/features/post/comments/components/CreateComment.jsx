import { useState } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "../hooks/useComments";
import { MessageSquareHeart } from "../../../../components/icons/message-square-heart";
import { PaperPlane } from "../../../../components/icons/paper-airplane";

export default function CreateComment({
    postId,
    parentComment = null,
    type = "top",
    replyTo = null,
}) {
    const [text, setText] = useState("");

    const { sendComment, loadingComments, fetchReplying } = useComments();

    const replying = replyTo ? fetchReplying(replyTo) : "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            return;
        }

        try {
            const data = {
                text,
                parentPost: postId,
                parentComment,
                replyTo,
            };

            await sendComment(data);
            setText("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <form
                onSubmit={handleSubmit}
                className="flex w-full justify-center gap-1 overflow-hidden"
            >
                <label
                    htmlFor="text-input"
                    className="w-full flex gap-2 items-center"
                >
                    {type === "sub" && (
                        <span className="text-slate-400 text-sm bg-slate-200   rounded-[4px] p-1">
                            @{replying?.username}
                        </span>
                    )}

                    <input
                        type="text"
                        id="text-input"
                        className={`w-full bg-white outline-none border-slate-200 focus:border-slate-400 hover:border-slate-300 ${type === "sub" ? "placeholder:text-sm border-b py-1" : "border rounded-[16px] px-4 py-2"}`}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={`${type === "top" ? "Add a comment" : `Reply`}`}
                    />
                </label>
                <button
                    disabled={!text.trim()}
                    className={`p-2 flex gap-2 items-center justify-center rounded-[14px] text-white text-sm !font-normal transition duration-300 ${!text.trim() || loadingComments.create ? "bg-slate-300/50 !cursor-default" : "opacity-100 cursor-pointer bg-slate-800 from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600"}`}
                >
                    {loadingComments.create ? (
                        <span className="h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></span>
                    ) : (
                        <div className="rounded-full overflow-hidden">
                            <PaperPlane />
                        </div>
                    )}
                </button>
            </form>
        </div>
    );
}
