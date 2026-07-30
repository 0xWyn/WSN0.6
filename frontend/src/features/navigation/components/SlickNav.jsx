import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import { useClan } from "../../clans/context/ClanProvider";
import { useState, useEffect, useRef } from "react";
import { icons } from "../../../components/icons/slickNav-icons";
import { ChevronDown } from "../../../components/icons/chevron-down";
import ClanCreationModal from "../../clans/components/ClanCreationModal";
import { ChevronLeft } from "../../../components/icons/chevron-left";

function BottomMenu() {
    const { logout } = useAuth();

    const actions = { Logout: () => logout(), "Add Account": () => {} };
    const options = ["Logout", "Add Account"];

    return (
        <div className="p-2 rounded-[28px] backdrop-blur-xl border border-white/50 bg-white/70 flex min-w-32 flex-col gap-1 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
            {options.map((option) => {
                return (
                    <button
                        key={option}
                        onClick={actions[option]}
                        className={`!px-3 !py-2 !rounded-[28px] text-left text-sm font-semibold text-slate-700 transition-all active:text-slate-100 duration-300 ${option === "Logout" ? "hover:bg-red-50" : "hover:bg-blue-600/20 active:bg-blue-900/30"}`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

export default function SlickNav() {
    const { user, logout } = useAuth();
    const { loading, clans, setShowClanModal } = useClan();

    const navigate = useNavigate();
    const location = useLocation();
    const [showBottomMenu, setShowBottomMenu] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const menuRef = useRef(null);

    const pathname = location.pathname;

    const sections = [
        {
            name: "Home",
            path: "/home",
            active: pathname === "/" || pathname === "/home",
        },
        {
            name: "Messages",
            path: "/chats",
            active: pathname.startsWith("/chats"),
        },
        {
            name: "Notifications",
            path: "/notifications",
            active: pathname.startsWith("/notifications"),
        },
        {
            name: "Search",
            path: "/explore",
            active: pathname.startsWith("/explore"),
        },
        {
            name: "Profile",
            path: `/user/${user._id}`,
            active: pathname === `/user/${user._id}`,
        },
        {
            name: "Settings",
            path: "/settings",
            active: pathname.startsWith("/settings"),
        },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowBottomMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (collapsed) return;

        const collapse = () => {
            pathname.split("/")[1] === "c"
                ? setCollapsed(true)
                : setCollapsed(false);
        };
        collapse();
    }, [pathname, collapsed]);

    return (
        <aside
            className={`h-screen flex h-full  flex-col border-r border-white/40 bg-white/25 backdrop-blur-3xl relative transition-all duration-300 ${!collapsed ? "w-[280px]" : "w-[80px] overflow-hidden"}`}
        >
            <button
                onClick={() => setCollapsed((state) => !state)}
                className="absolute right-0 top-6 border !p-[1px] border-white/70 bg-white/60 backdrop-blur-lg text-slate-700 !rounded-full w-10 flex justify-center opacity-0 hover:opacity-100 transition-all duration-500 hover:shadow-[0_9px_10px_rgba(15,23,42,.10)] active:scale-80"
            >
                <ChevronLeft />
            </button>
            {/* Top */}

            <div className="p-5">
                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {sections.map((section) => (
                        <Link key={section.name} to={section.path}>
                            <div
                                className={`group flex items-center gap-4 rounded-[24px] px-4 py-3 transition-all duration-300 ${
                                    section.active
                                        ? "border border-white/80 bg-white/80 text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                                        : "border border-transparent text-slate-600 hover:border-white/40 hover:bg-white/40 hover:text-slate-900"
                                }`}
                            >
                                <span
                                    className={`transition-colors ${
                                        section.active
                                            ? "text-slate-900"
                                            : "text-slate-500 group-hover:text-slate-700"
                                    }`}
                                >
                                    {icons[section.name]}
                                </span>

                                <span className="font-medium">
                                    {section.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Middle */}
            <div className="px-4">
                <div className="flex flex-col rounded-[32px] border border-white/60 bg-white/40 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            My Clans
                        </h3>

                        <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-medium text-slate-600">
                            {Object.keys(clans ?? {}).length}
                        </span>
                    </div>
                    {/* Clans */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                        {Object.values(clans ?? {}).map((clan) => {
                            const isActive = pathname === `/c/${clan._id}`;

                            return (
                                <Link key={clan._id} to={`/c/${clan._id}`}>
                                    <div
                                        className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300 ${
                                            isActive
                                                ? "bg-white/80 shadow-sm"
                                                : "hover:bg-white/50"
                                        }`}
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-sky-200 text-xs font-bold text-slate-800">
                                            {clan.name.charAt(0)}
                                        </div>

                                        <span className="truncate text-sm font-medium text-slate-700">
                                            {clan.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                        <button
                            onClick={() => setShowClanModal(true)}
                            className="rounded-2xl border border-dashed border-slate-300 bg-white/50 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100/30 active:bg-slate-100/70 duration-300"
                        >
                            + Create Clan
                        </button>

                        <Link to="/clans">
                            <div className="rounded-2xl px-4 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-white/50">
                                Explore Communities
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="p-2 mt-2">
                <div ref={menuRef} className="relative">
                    <div
                        className={`absolute bottom-[90px] left-0 right-0 z-20 transition-all duration-300 ${showBottomMenu ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
                    >
                        <BottomMenu />
                    </div>

                    {/* Brand */}
                    <div
                        onClick={() => setShowBottomMenu((v) => !v)}
                        className={`relative z-10 rounded-[32px] border border-white/60 bg-white/40 p-5 cursor-pointer transition-all duration-300 ${
                            showBottomMenu
                                ? "shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                                : "hover:shadow-[0_10px_40px_rgba(15,23,42,0.08)] shadow-[0_20px_50px_rgba(15,23,42,0.05)]"
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-amber-300 to-sky-300 text-xl font-black text-slate-900 shadow-lg">
                                {user?.username?.charAt(0)?.toUpperCase() ||
                                    "W"}
                            </div>

                            <div name="profile-link" className="min-w-0 flex-1">
                                <p className="truncate text-xs tracking-wider text-slate-500">
                                    Signed in as
                                </p>
                                <p className="truncate font-semibold text-slate-900">
                                    {user?.username || "Guest"}
                                </p>
                            </div>

                            <div
                                className={`transition-transform duration-300 size-5 flex items-center justify-center text-slate-500 ${showBottomMenu ? "rotate-180" : ""} `}
                            >
                                <ChevronDown />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
