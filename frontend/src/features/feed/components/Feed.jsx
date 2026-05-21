import { useEffect } from "react";
import { useFeedPosts } from "../hooks/useFeedPosts.js";
import { usePostActions } from "../hooks/usePostActions.js";
import { useFeedSocket } from "../socket/useFeedSocket.js";
import CreatePost from "./CreatePost.jsx";
import PostContainer from "./PostContainer.jsx";

export default function Feed() {
    useFeedSocket();

    const { fetchGlobalPosts } = useFeedPosts();
    useEffect(() => {
        fetchGlobalPosts(1);
    }, []);

    const { handleNewPost, handleDeletePost } = usePostActions();

    const makePost = async (post) => {
        handleNewPost(post);
    };
    const deletePost = async (postId) => {
        handleDeletePost(postId);
    };

    const target = { type: "home", userId: null };
    return (
        <div className="relative min-h-screen bg-[#f8fafc] px-4 py-6">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />

                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
                <header className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white/35 backdrop-blur-2xl px-7 py-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                                Feed
                            </p>

                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                                Conversations worth your attention
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                Explore thoughts, moments, updates, and stories
                                from your community.
                            </p>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-slate-600">
                            Stay connected with the latest posts from your
                            community. Create, explore, and react in a clean,
                            modern feed.
                        </p>
                    </div>
                </header>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <main className="flex-1 flex flex-col gap-6">
                        <CreatePost onSubmit={makePost} />
                        <PostContainer target={target} onDelete={deletePost} />
                    </main>
                    <aside className="flex w-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-80">
                        <div className="rounded-3xl bg-slate-100 p-4">
                            <p className="text-sm font-semibold text-slate-900">
                                Why follow the feed?
                            </p>
                            <p className="mt-2 text-sm text-slate-600 leading-6">
                                Discover timely updates, community highlights,
                                and hot discussions in one elegant experience.
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-100 p-4">
                            <p className="text-sm font-semibold text-slate-900">
                                Quick actions
                            </p>
                            <div className="mt-3 flex flex-col gap-3">
                                <button className="rounded-3xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50">
                                    Preview new posts
                                </button>
                                <button className="rounded-3xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50">
                                    Manage saved stories
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
