import PostContainer from "../../feed/components/PostContainer";
import { useFeed } from "../../feed/context/FeedProvider";
import { useFeedSocket } from "../../feed/socket/useFeedSocket";

export default function UserFeed({ userId }) {
    const { queries } = useFeed();
    useFeedSocket(userId);

    const posts = queries.postsByUser?.[userId] ?? [];

    return (
        <section className="w-full p-8">
            {/* Preamble */}
            <div className="mb-4 flex items-end justify-between px-2">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Posts
                </h2>
                <span className="text-sm text-slate-400">
                    {posts.length} {posts.length === 1 ? "post" : "posts"}
                </span>
            </div>

            <PostContainer posts={posts} />
        </section>
    );
}
