import { useParams } from "react-router-dom";
import LocNav from "../../navigation/components/LocNav";
import { useProfile } from "../hooks/useProfile";
import { useUserSocket } from "../web/useUserSocket";
import UserFeed from "./UserFeed";
import ProfileView from "./ProfileView";
import { useFeedPosts } from "../../feed/hooks/useFeedPosts";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { useUser } from "../context/UserProvider";

export default function UserPage() {
    const { id } = useParams();
    const { loading, user } = useProfile(id);
    const { isEditing, setIsEditing } = useUser();

    useUserSocket();

    const { fetchUserPosts } = useFeedPosts();

    useEffect(() => {
        fetchUserPosts(1, id);
    }, [id]);

    useEffect(() => {
        return () => {
            setIsEditing(false);
        };
    }, []);

    if (loading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
                <div className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] relative">
            {/* Ambience */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/15 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 z-40">
                <LocNav current={`@${user.username}`} />
            </div>

            {/* Main */}
            <div className="px-4 py-6 z-10 flex justify-center w-full">
                {/* Content */}
                <div className="flex w-full max-w-5xl flex-col items-center gap-4 p-6">
                    <ProfileView user={user} />

                    {/* Feed */}
                    <div className="max-w-4xl w-full">
                        <UserFeed userId={user._id} />
                    </div>
                </div>
                {/* Profile Card */}
            </div>

            {isEditing && <EditProfile />}
        </div>
    );
}
