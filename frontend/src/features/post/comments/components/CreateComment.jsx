import { useState } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "../hooks/useComments";

export default function CreateComment({ postId, parentComment = null }) {
    const [text, setText] = useState("");
    const { addComment } = useComments();
    const disabled = !text.trim();
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
            };
            const res = await addComment(data);
            console.log(res);
            setText("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex w-full justify-center gap-2"
            >
                <label htmlFor="text-input" className="w-full">
                    <input
                        type="text"
                        id="text-input"
                        className="border border-gray-400 p-2 w-full rounded-md bg-white focus:outline-blue-800"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a comment"
                    />
                </label>
                <button
                    className={`text-white text-sm !font-normal ${disabled ? "bg-gray-300 text-gray-400 !cursor-default" : "bg-slate-800 hover:bg-slate-700 cursor-pointer"}`}
                >
                    Post
                </button>
            </form>
        </div>
    );
}
