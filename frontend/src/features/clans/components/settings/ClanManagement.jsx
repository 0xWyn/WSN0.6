import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import LocNav from "../../../navigation/components/LocNav";
import { useClan } from "../../context/ClanProvider";
import { useClanAccess } from "../../hooks/useClanAccess";
import { useClanResolver } from "../../hooks/useClanResolver";
import { IdentityBadge } from "../IdentityBadge";
import { useEffect, useState } from "react";

export default function ClanManagement() {
    const { id } = useParams();
    const location = useLocation();

    useClanResolver(id);
    const { activeClan: clan, loadingClans } = useClan();
    const { isAuthority, isLeader } = useClanAccess(clan);
    const navigate = useNavigate();

    // const [section, setSection] = useState("general");

    const currentLocation = location.pathname?.split("/").pop();

    const section =
        currentLocation === "settings" ? "general" : currentLocation;

    if (loadingClans.activeClan)
        return (
            <div className="animate-spin size-10 border-4 border-r-white rounded-full"></div>
        );

    const sections = {
        general: {
            title: "General",
            permission: isAuthority,
            function: () => {
                navigate("general");
            },
        },
        requests: {
            title: `Requests (${clan?.joinRequests?.length})`,
            permission: isAuthority && clan.visibility === "private",
            function: () => {
                navigate("requests");
            },
        },
        members: {
            title: "Members",
            permission: isAuthority,
            function: () => {
                navigate("members");
            },
        },
        moderators: {
            title: "Moderators",
            permission: isLeader,
            function: () => {
                navigate("moderators");
            },
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
                <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Nav */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/60 bg-white/70 pr-4 backdrop-blur-xl">
                <div className="flex items-center">
                    <LocNav current={clan?.name} />
                    <IdentityBadge clan={clan} />
                </div>
            </div>

            {/* Main */}
            <div className="relative min-h-0 px-4 py-6">
                {/* Content */}
                <div className="mx-auto h-full min-h-0 w-full max-w-6xl flex flex-col gap-5">
                    {/* Header */}
                    <header className="rounded-[36px] border border-white/60 bg-white/35 p-8 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)] w-full">
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                            Clan Management
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                            Manage your clan, review requests, security, and
                            preferences.
                        </p>
                    </header>

                    {/* Panels */}
                    <div className="w-full flex gap-6 items-center justify-center h-[30rem]">
                        {/* Left Panel */}
                        <div className="w-1/4 shrink-0 h-full space-y-4 p-8 border border-white/70 bg-white/35 backdrop-blur-3xl shadow-[0_20px_30px_rgba(10,15,20,0.03)] rounded-[24px]">
                            {Object.values(sections).map(
                                (section) =>
                                    section.permission && (
                                        <div
                                            onClick={section.function}
                                            key={section.title}
                                            className="cursor-pointer font-medium text-slate-600 rounded-full p-2 px-4 hover:shadow-sm transition-all duration-300"
                                        >
                                            {section.title.split(" ")[0]}
                                        </div>
                                    )
                            )}
                        </div>

                        {/* Right Panel */}
                        {section && (
                            <div className="flex flex-col flex-1 h-full space-y-4 p-8 border border-white/60 bg-white/35 backdrop-blur-3xl shadow-[0_20px_30px_rgba(10,15,20,0.03)] rounded-[24px]">
                                <h3 className="text-lg sm:text-3xl sm:font-bold font-medium text-slate-800">
                                    {sections[section].title}
                                </h3>

                                {/* Component */}
                                <div className="flex-1 min-h-0 overflow-hidden p-2 rounded-[24px] border">
                                    <Outlet />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
