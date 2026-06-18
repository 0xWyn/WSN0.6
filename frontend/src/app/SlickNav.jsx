import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthProvider";
import { useClan } from "../features/clans/context/ClanProvider";

const icons = {
    Home: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M4 11.5 12 4l8 7.5v7a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-7Z"
                fill="currentColor"
            />
        </svg>
    ),
    Messages: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7l-4 4V6a1 1 0 0 1 1-1Z"
                fill="currentColor"
            />
        </svg>
    ),
    Notifications: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M12 22a2.5 2.5 0 0 1-2.45-2H14.5A2.5 2.5 0 0 1 12 22Zm7-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C6.63 5.36 5 7.92 5 11v5l-1 1v1h16v-1l-1-1Z"
                fill="currentColor"
            />
        </svg>
    ),
    Search: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M10 18a8 8 0 1 1 5.29-2.14l4.43 4.43 1.42-1.42-4.43-4.43A8 8 0 0 1 10 18Zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                fill="currentColor"
            />
        </svg>
    ),
    Profile: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.66-6 3.75V20h12v-2.25C18 15.66 15.31 14 12 14Z"
                fill="currentColor"
            />
        </svg>
    ),
    Settings: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm7.9-2.1-1.1-.2a6.9 6.9 0 0 0-.5-1.2l.7-1.1a1 1 0 0 0-.2-1.3l-1.4-1.4a1 1 0 0 0-1.3-.2l-1.1.7a7 7 0 0 0-1.2-.5l-.2-1.1A1 1 0 0 0 12.2 3h-1.4a1 1 0 0 0-1 .8l-.2 1.1a6.9 6.9 0 0 0-1.2.5l-1.1-.7a1 1 0 0 0-1.3.2L3.4 5.9a1 1 0 0 0-.2 1.3l.7 1.1c-.2.4-.4.8-.5 1.2l-1.1.2A1 1 0 0 0 1 12.8v1.4a1 1 0 0 0 .8 1l1.1.2c.1.4.3.8.5 1.2l-.7 1.1a1 1 0 0 0 .2 1.3l1.4 1.4a1 1 0 0 0 1.3.2l1.1-.7c.4.2.8.4 1.2.5l.2 1.1a1 1 0 0 0 1 .8h1.4a1 1 0 0 0 1-.8l.2-1.1c.4-.1.8-.3 1.2-.5l1.1.7a1 1 0 0 0 1.3-.2l1.4-1.4a1 1 0 0 0 .2-1.3l-.7-1.1c.2-.4.4-.8.5-1.2l1.1-.2a1 1 0 0 0 .8-1v-1.4a1 1 0 0 0-.8-1Z"
                fill="currentColor"
            />
        </svg>
    ),
};

export default function SlickNav() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { loading, clans } = useClan();

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
            path: "/search",
            active: pathname.startsWith("/search"),
        },
        // {
        //     name: "Profile",
        //     path: `/user/${user._id}`,
        //     active: pathname === `/user/${user._id}`,
        // },
        // {
        //     name: "Settings",
        //     path: "/settings",
        //     active: pathname.startsWith("/settings"),
        // },
    ];

    return (
        <aside className="flex h-full w-[280px] flex-col justify-between border-r border-white/40 bg-white/25 backdrop-blur-3xl">
            {/* Top */}
            <div className="flex flex-col gap-6 p-5">
                {/* Brand */}
                <div className="rounded-[32px] border border-white/60 bg-white/40 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-amber-300 to-sky-300 text-xl font-black text-slate-900 shadow-lg">
                            {user?.username?.charAt(0)?.toUpperCase() || "W"}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                                {user?.username || "Guest"}
                            </p>

                            <p className="truncate text-sm text-slate-500">
                                Welcome back
                            </p>
                        </div>
                    </div>
                </div>

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
            <div className="rounded-[32px] border border-white/60 bg-white/40 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Clans
                    </h3>

                    <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-medium text-slate-600">
                        {Object.keys(clans ?? {}).length}
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    {Object.values(clans ?? {})
                        .slice(0, 5)
                        .map((clan) => {
                            const isActive = pathname === `/clans/${clan._id}`;

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

                <div className="mt-4 flex flex-col gap-2">
                    <button className="rounded-2xl border border-dashed border-slate-300 bg-white/50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white">
                        + Create Clan
                    </button>

                    <Link to="/clans">
                        <div className="rounded-2xl px-4 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-white/50">
                            Explore Communities
                        </div>
                    </Link>
                </div>
            </div>
            {/* Bottom */}
            <div className="p-5">
                <div className="rounded-[32px] border border-white/60 bg-white/40 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Signed in as
                    </p>

                    <p className="mt-1 truncate font-medium text-slate-900">
                        @{user?.username || "guest"}
                    </p>

                    <button
                        onClick={logout}
                        className="mt-5 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-white hover:shadow-md active:scale-[0.98]"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
