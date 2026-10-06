import { useParams } from "react-router-dom";
import { useFeed } from "../context/FeedProvider";
import { useFeedPosts } from "../hooks/useFeedPosts";
import { useFeedSocket } from "../socket/useFeedSocket";
import PostContainer from "./PostContainer";
import PostSkeleton from "./PostSkeleton";
import { useEffect, useRef } from "react";

export default function ClanFeed() {
    const { id } = useParams();

    useFeedSocket(id);

    const { fetchClanPosts } = useFeedPosts();
    const { feedLoad, queries } = useFeed();

    // PROBLEM HERE

    useEffect(() => {
        if (!id) return;

        fetchClanPosts("1", id);
    }, [id]);

    if (feedLoad.clan)
        return (
            <section className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-[24px] border border-slate-200/70 bg-white/70">
                {[1, 2, 3].map((item) => (
                    <PostSkeleton key={item} />
                ))}
            </section>
        );

    const postIds = queries?.postsByClan?.[id] || [];

    if (postIds.length === 0 && !feedLoad.clan) {
        return (
            <section className="rounded-[24px] border border-dashed border-slate-200 bg-white/50 px-6 py-14 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-lg">
                    ✦
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    Nothing here yet
                </h3>
                <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-slate-500">
                    Be the first to start a conversation.
                </p>
            </section>
        );
    }
    return <PostContainer posts={postIds} />;
}
