import { formatDate } from "../../../utils/formatDate.js";

export default function Author({ post, type }) {
    const author = post?.author;
    return (
        <div
            className={`flex leading-tight] ${type === "comment" ? "flex items-center gap-1" : "flex-col items-start space-y-1"}`}
        >
            <p className="text-slate-700 font-semibold text-md tracking-tight">
                {author.username}
            </p>
            {type === "comment" && <span className="text-slate-400">•</span>}
            <p className="text-xs text-slate-400 truncate">
                {formatDate(post?.createdAt)}
            </p>
        </div>
    );
}
