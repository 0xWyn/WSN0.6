import { use, useState } from "react";
import { useComments } from "../hooks/useComments";
import CommentCard from "./CommentCard";
import { useEntities } from "../../../global/EntityProvider";
import { useFeed } from "../../../feed/context/FeedProvider";
import { useHydratePost } from "../../../feed/utils/useHydratePost";

export default function Container({ postId }) {
    const { loadingComments } = useComments(postId);
    const { entities } = useEntities();
    const { queries } = useFeed();
    const { hydratePost } = useHydratePost();

    const [replying, setReplying] = useState(false);

    const commentIds = queries?.commentsByPost?.[postId] || [];

    const mappedComments = commentIds?.map((id) => (
        <div key={id}>
            <CommentCard
                comment={hydratePost(entities.comments[id])}
                onReply={() => setReplying(id)}
            />
        </div>
    ));

    if (loadingComments.topLevel) {
        return <CommentSkeleton count={3} />;
    }

    return (
        <>
            <div className="w-full h-full flex flex-col gap-2 mt-2 rounded-[20px] border-slate-200">
                {mappedComments.length > 0 ? (
                    mappedComments
                ) : (
                    <div className="flex flex-col gap-2 py-2 rounded-3xl overflow-y-auto no-scrollbar max-h-100">
                        <div className="rounded-[32px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                            <h3 className="font-semibold text-slate-900">
                                No comments yet.
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Be the first to start the conversation
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

function CommentSkeleton({ count = 4 }) {
    return (
        <>
            {/* Horizontal clan cards */}
            <div className="flex flex-col gap-4 skeleton-shimmer">
                {Array.from({ length: count }).map((_, j) => (
                    <div
                        key={j}
                        className="flex items-center p-4 w-full rounded-3xl border border-slate-200 bg-white"
                    >
                        {/* Avatar */}
                        <div className="flex items-center gap-3 w-full">
                            <div className="size-14 rounded-full bg-slate-200" />

                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-28 rounded bg-slate-200" />
                                <div className="h-4 w-full rounded bg-slate-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
