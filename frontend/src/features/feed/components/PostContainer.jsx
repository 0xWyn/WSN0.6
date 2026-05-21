import PostCard from "../../post/main/components/PostCard";
import { useFeed } from "../context/FeedProvider";

export default function PostContainer({ target, onDelete }) {
    const { loading, entities, queries } = useFeed();

    if (loading)
        return (
            <div className="w-full rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
                Loading...
            </div>
        );

    const posts =
        target.type === "home"
            ? queries.homeFeed.map((id) => entities.posts[id])
            : queries.usersPosts[target.userId].map((id) => entities.posts[id]);

    const mappedPosts = posts.map((post) => {
        const author = entities.users[post.author];
        const hydratedPost = { ...post, author: author };
        return (
            <PostCard key={post._id} post={hydratedPost} onDelete={onDelete} />
        );
    });
    return (
        <section className="flex w-full flex-col gap-5">
            {mappedPosts.length ? (
                mappedPosts
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
                    No posts yet.
                </div>
            )}
        </section>
    );
}
