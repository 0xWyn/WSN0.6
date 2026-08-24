import { useEntities } from "../../global/EntityProvider";
import PostCard from "../../post/main/components/PostCard";
import { useFeedPosts } from "../hooks/useFeedPosts";
import { useHydratePost } from "../utils/useHydratePost";

const PostSkeleton = () => {
    return (
        <div className="animate-pulse p-5 sm:p-6">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-200" />
                <div className="space-y-2">
                    <div className="h-3 w-28 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-20 rounded-full bg-slate-100" />
                </div>
            </div>

            <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-4/5 rounded-full bg-slate-100" />
                <div className="h-3 w-2/5 rounded-full bg-slate-100" />
            </div>

            <div className="mt-5 h-10 w-48 rounded-xl bg-slate-100" />
        </div>
    );
};
export default function PostContainer({ posts = [] }) {
    const { entities } = useEntities();
    const { loadingFeedPosts } = useFeedPosts();

    const { hydratePost } = useHydratePost();

    if (loadingFeedPosts.clanPosts && !posts.length)
        return (
            <section className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-[24px] border border-slate-200/70 bg-white/70">
                {[1, 2, 3].map((item) => (
                    <PostSkeleton key={item} />
                ))}
            </section>
        );

    if (!loadingFeedPosts.clanPosts && !posts.length) {
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

    const mappedPosts = posts.map((id) => {
        console.log(hydratePost(entities.posts[id]));
        return <PostCard key={id} post={hydratePost(entities.posts[id])} />;
    });

    return (
        <section className="flex w-full flex-col gap-5 h-full min-h-0">
            {loadingFeedPosts.clanPosts && (
                <div className="flex justify-center py-4">
                    <div className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
                </div>
            )}

            {mappedPosts}
        </section>
    );
}
