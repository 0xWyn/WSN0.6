import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFeedPosts } from "../../../feed/hooks/useFeedPosts";
import { useFeedSocket } from "../../../feed/socket/useFeedSocket";
import { useHydratePost } from "../../../feed/utils/useHydratePost";
import { useEntities } from "../../../global/EntityProvider";
import LocNav from "../../../navigation/components/LocNav";
import CommentSection from "../../comments/components/CommentSection";
import PostCard from "./PostCard";
import PostFocus from "./PostFocus";

export default function PostPage() {
    const { id } = useParams();
    const { entities } = useEntities();
    const { fetchSinglePost, loadingFeedPosts } = useFeedPosts();
    const { hydratePost } = useHydratePost();

    useFeedSocket();

    useEffect(() => {
        fetchSinglePost(id);
    }, []);

    const post = entities.posts[id];

    if (loadingFeedPosts.singlePost || !post) return <div>Loading...</div>;

    const clan = entities.clans[post.clan];

    return (
        <div className="min-h-screen bg-[#f8fafc] w-full relative">
            {/* Ambient background */}
            <div className="pointer-events-none absolute z-0 inset-0 overflow-hidden">
                <div className="fixed left-1/3 top-0 size-[26rem] lg:size-[32rem] rounded-full bg-amber-200/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 z-40">
                <LocNav current={`Post to ${clan?.name}`} />
            </div>

            <div className="flex flex-col gap-2 lg:flex-row items-start justify-center px-4 md:py-6 min-h-0  w-full max-w-7xl mx-auto">
                {/* Main */}
                <main className="flex w-full justify-center p-6">
                    {/* Content */}
                    <div className="flex w-full max-w-3xl flex-col items-center  border shadow-[0_10px_20px_rgba(12,12,12,0.05)] border-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden bg-white/50">
                        <PostFocus post={hydratePost(post)} />
                        {/* Coments */}
                        <div className="flex  min-h-0 flex-1 w-full">
                            <CommentSection post={post} />
                        </div>
                    </div>
                </main>

                {/* More */}

                <div className="w-full lg:max-w-md relative">
                    <div className="w-full p-6 lg:fixed">
                        <aside className="bg-white/40  backdrop-blur-xl flex-1 rounded-[32px] shadow-[0_5px_5px_rgba(12,12,12,0.05)] w-full px-8 py-8 flex flex-col gap-2 border border-white/70">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-800">
                                    Explore
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    Other posts you might like
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-2">
                                    <div className=" bg-white border border-slate-200 rounded-2xl h-10 w-30" />
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-10" />
                                </div>
                                <div className="flex gap-2">
                                    <div className=" bg-slate-50 border border-slate-200 rounded-2xl h-10 w-30" />
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-10" />
                                </div>
                                <div className="flex gap-2">
                                    <div className=" bg-slate-50 border border-slate-200 rounded-2xl h-10 w-30" />
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-10" />
                                </div>{" "}
                                <div className="flex gap-2">
                                    <div className=" bg-slate-50 border border-slate-200 rounded-2xl h-10 w-30" />
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-10" />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
