import { formatDate } from "../../../utils/formatDate.js";

export default function Author({ post }) {
    const author = post?.author;
    return (
        <div className="flex flex-col items-start leading-tight]">
            <p className="text-slate-800 font-semibold text-[15px] tracking-tight">
                @{author.username}
            </p>
            <p className="mt-1 text-xs text-slate-400">
                {formatDate(post?.createdAt)}
            </p>
        </div>
    );
}
