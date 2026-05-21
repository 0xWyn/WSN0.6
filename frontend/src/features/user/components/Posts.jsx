import { useFeed } from "../../feed/context/FeedProvider";
import PostContainer from "../../feed/components/PostContainer";

export default function Posts({ user }) {
    const { queries } = useFeed();
    const posts = queries.usersPosts[user._id];

    if (!posts) return <div>Loading...</div>;

    return (
        <>
            <div className="mt-10 space-y-5">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <p className="text-xs uppercase tracking text-slate-400">
                            Content
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                            Posts
                        </h2>
                    </div>
                    <span className="rounded-full bg-white/60 px-3 py-1 text-sm text-slate-500 background-blur-xl border border-white/79">
                        {posts.length} {posts.length === 1 ? "post" : "posts"}
                    </span>
                </div>
            </div>

            <PostContainer target={{ type: "user", userId: user._id }} />
        </>
    );
}
