import { formatDate } from "../../../utils/formatDate.js";

export default function Author({ post, type, format = "feed" }) {
    const author = post?.author;

    return (
        <div
            className={`flex leading-tight] ${type === "comment" ? "flex items-center gap-1" : "flex-col items-start space-y-1"}`}
        >
            <p
                className={`text-slate-700/50 text-sm tracking-tight flex ${format === "focus" ? "flex-col" : "gap-1"}`}
            >
                <span className="font-semibold text-slate-700">
                    {author.name}
                </span>
                @{author.username}
            </p>
            {type === "comment" && <span className="text-slate-400">•</span>}

            {format !== "focus" && (
                <p className="text-xs text-slate-700/40 truncate">
                    {formatDate(post?.createdAt)}
                </p>
            )}
        </div>
    );
}
