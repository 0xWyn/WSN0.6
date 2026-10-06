import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LocNav from "../../../navigation/components/LocNav";
import { useClanManagement } from "../../context/ClanManagementProvider";
import { useClan } from "../../context/ClanProvider";
import { useClanAccess } from "../../hooks/useClanAccess";
import { IdentityBadge } from "../IdentityBadge";
import { useEffect } from "react";

export default function ClanManagement() {
    const location = useLocation();

    const { activeClan: clan } = useClan();
    const { requests } = useClanManagement();

    const { isAuthority, isFounder } = useClanAccess(clan);
    const navigate = useNavigate();

    const currentLocation = location.pathname?.split("/").pop();

    const section =
        currentLocation === "settings" ? "general" : currentLocation;

    const sections = {
        general: {
            title: "General",
            permission: isAuthority,
            function: () => {
                navigate("general");
            },
        },
        requests: {
            title: `Requests (${requests.length})`,
            permission: isAuthority && clan.access === "private",
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
            permission: isFounder,
            function: () => {
                navigate("moderators");
            },
        },
    };

    return (
        <div className="flex flex-col h-screen bg-[#f8fafc]">
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
            <div className="relative flex flex-1 min-h-0 px-4 py-10">
                <div className="mx-auto flex-1 min-h-0 w-full max-w-6xl flex flex-col gap-5">
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
                    <div className="w-full flex flex-1 gap-6 items-stretch justify-center min-h-0">
                        {/* Left Panel */}
                        <div className="w-1/4 shrink-0 space-y-4 p-8 overflow-y-auto border border-white/70 bg-white/35 backdrop-blur-3xl shadow-[0_20px_30px_rgba(10,15,20,0.03)] rounded-[24px]">
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
                            <div className="flex min-h-0 flex-1 overflow-hidden flex-col flex-1 space-y-4 p-8 border border-white/60 bg-white/35 backdrop-blur-3xl shadow-[0_20px_30px_rgba(10,15,20,0.03)] rounded-[24px]">
                                <h3 className="shrink-0 text-lg sm:text-2xl font-bold text-slate-800">
                                    {sections[section].title}
                                </h3>

                                {/* Component */}
                                <div className="flex-1 min-h-0 rounded-[24px]">
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
