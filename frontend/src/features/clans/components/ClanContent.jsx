import { act, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Bars3 } from "../../../components/icons/hamburger.jsx";
import Pencil from "../../../components/icons/pencil.jsx";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser.js";
import ClanFeed from "../../feed/components/ClanFeed.jsx";
import CreatePost from "../../feed/components/CreatePost.jsx";
import { useFeedPosts } from "../../feed/hooks/useFeedPosts.js";
import LocNav from "../../navigation/components/LocNav.jsx";
import { useClan } from "../context/ClanProvider.jsx";
import { useClanAccess } from "../hooks/useClanAccess.js";
import { useClanResolver } from "../hooks/useClanResolver.js";
import ClanMenu from "./ClanMenu.jsx";
import { IdentityBadge } from "./IdentityBadge.jsx";

export default function ClanContent() {
    const user = useCurrentUser();

    const { id } = useParams();

    useClanResolver(id);

    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showClanMenu, setShowClanMenu] = useState(false);
    const menuRef = useRef(null);

    const { activeClan, loadingClans } = useClan();
    const { fetchClanPosts } = useFeedPosts();

    useEffect(() => {
        if (!id) return;

        fetchClanPosts("1", id);
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowClanMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loadingClans.activeClan) return <div>Loading...</div>;

    const clan = activeClan;

    const { isMember } = useClanAccess(clan);

    if (!clan) return <div>Clan not found</div>;

    return (
        <div className="min-h-0 bg-[#f8fafc] w-full">
            {/* Ambient background */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden">
                <div className="absolute left-80 lg:right-1/3 top-0 size-[26rem] lg:size-[40rem] rounded-full bg-amber-200/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {showCreationModal && (
                <div className="fixed w-full h-full bg-slate-950/50 backdrop-blur-xs z-50 inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200">
                        <CreatePost
                            closeModal={() => setShowCreationModal(false)}
                            clan={clan}
                        />
                    </div>
                </div>
            )}

            {/* Nav */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/60 bg-white/60 pr-4 backdrop-blur-xl">
                <div className="flex items-center">
                    <LocNav current={clan?.name} />
                    <IdentityBadge clan={clan} />
                </div>

                <div ref={menuRef} className="flex gap-2">
                    {/* Clan Menu */}
                    {showClanMenu && (
                        <div className="absolute right-4 top-15 rounded-[14px]">
                            <ClanMenu clan={clan} />
                        </div>
                    )}

                    <button
                        disabled={!isMember}
                        type="button"
                        onClick={() => setShowClanMenu((prev) => !prev)}
                        className="group flex items-center gap-2"
                    >
                        <div className="p-2 rounded-[14px] bg-slate-50 hover:bg-slate-100/70  text-slate-600  group-hover:scale-105 group-hover:text-slate-800 transition-all duration-300">
                            <Bars3 />
                        </div>
                    </button>
                </div>
            </div>

            {/* Main */}
            <div className="px-6 py-4">
                {/* Content */}
                <div className="relative z-10 mx-auto flex w-full max-w-7xl px-8 py-8 sm:px-6 lg:py-8 flex-col gap-4">
                    {/* Clan Identity */}

                    <header className="rounded-[32px] border border-white/90 bg-white/65 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)] space-y-2 overflow-hidden">
                        {/* Ambience */}
                        <div className="relative h-28 w-full overflow-hidden">
                            <div className="absolute size-52 rounded-full top-4 -right-10 bg-sky-200/30 blur-2xl" />
                            <div className="absolute -left-10 bottom-10 size-48 rounded-full bg-amber-300/20 blur-3xl" />
                        </div>

                        <div className="relative px-6 pb-6 sm:px-8">
                            <div className="-mt-12 flex items-end justify-between">
                                <div className="flex size-24 items-center justify-center overflow-hidden rounded-[28px] border-4 border-white bg-slate-100 text-3xl font-medium text-slate-700 shadow-lg">
                                    {clan.avatar ? (
                                        <img
                                            src={clan.avatar.url}
                                            alt={clan.name}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        clan.name?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        Share
                                    </button>
                                    {!isMember && (
                                        <button
                                            type="button"
                                            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                        >
                                            Join
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Identity */}
                            <div className="mt-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                            {clan.name}
                                        </h1>

                                        {clan.description && (
                                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                                {clan.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2 text-sm text-slate-500">
                                        <span className="font-semibold text-slate-800">
                                            {clan.members?.length ?? 0}
                                        </span>
                                        member
                                        {clan.members?.length === 1 ? "" : "s"}
                                    </div>
                                </div>

                                {clan.tags?.length > 0 && (
                                    <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                                        {" "}
                                        {clan.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="shrink-0 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                                            >
                                                {" "}
                                                #{tag}{" "}
                                            </span>
                                        ))}{" "}
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="mt-6 grid px-4 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                        <main className="min-w-0">
                            {/* Composer */}
                            {isMember && (
                                <div className="mb-5 flex w-full items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCreationModal(
                                                (prev) => !prev
                                            )
                                        }
                                        className="relative group h-10 w-10 p-2 rounded-2xl flex items-center gap-2 justify-center bg-slate-100  border border-slate-200 bg-white text-sm font-medium shadow-sm hover:border-slate-300 hover:shadow-md transition duration-300 mr-2"
                                    >
                                        <div className="size-4 transition-transform group-hover:-rotate-6 flex items-center justify-center">
                                            <Pencil />
                                        </div>

                                        <span className="absolute w-20 top-11 opacity-0 sm:block group-hover:opacity-100 transition-all duration-300 text-xs bg-white/50 border-white rounded-[20px] p-2 shadow-md text-slate-500 z-100">
                                            Create post
                                        </span>
                                    </button>

                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Share something with {clan.name}
                                        </p>
                                        <p className="mt-0 5 text-xs text-slate-400">
                                            Start a conversation with the clan
                                        </p>
                                    </div>
                                </div>
                            )}
                            <ClanFeed />
                        </main>

                        <aside className="flex w-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-80">
                            <div className="rounded-3xl bg-slate-100 p-4">
                                <p className="text-sm font-semibold text-slate-900">
                                    Why follow the feed?
                                </p>
                                <p className="mt-2 text-sm text-slate-600 leading-6">
                                    Discover timely updates, community
                                    highlights, and hot discussions in one
                                    elegant experience.
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
        </div>
    );
}
