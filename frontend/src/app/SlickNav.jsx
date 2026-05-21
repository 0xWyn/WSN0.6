import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthProvider";

const icons = {
    Home: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M4 11.5 12 4l8 7.5v7a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-7Z"
                fill="currentColor"
            />
        </svg>
    ),
    messages: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7l-4 4V6a1 1 0 0 1 1-1Z"
                fill="currentColor"
            />
        </svg>
    ),
    notifications: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M12 22a2.5 2.5 0 0 1-2.45-2H14.5A2.5 2.5 0 0 1 12 22Zm7-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C6.63 5.36 5 7.92 5 11v5l-1 1v1h16v-1l-1-1Z"
                fill="currentColor"
            />
        </svg>
    ),
    search: (
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
    settings: (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm7.9-2.1-1.1-.2a6.9 6.9 0 0 0-.5-1.2l.7-1.1a1 1 0 0 0-.2-1.3l-1.4-1.4a1 1 0 0 0-1.3-.2l-1.1.7a7 7 0 0 0-1.2-.5l-.2-1.1A1 1 0 0 0 12.2 3h-1.4a1 1 0 0 0-1 .8l-.2 1.1a6.9 6.9 0 0 0-1.2.5l-1.1-.7a1 1 0 0 0-1.3.2L3.4 5.9a1 1 0 0 0-.2 1.3l.7 1.1c-.2.4-.4.8-.5 1.2l-1.1.2A1 1 0 0 0 1 12.8v1.4a1 1 0 0 0 .8 1l1.1.2c.1.4.3.8.5 1.2l-.7 1.1a1 1 0 0 0 .2 1.3l1.4 1.4a1 1 0 0 0 1.3.2l1.1-.7c.4.2.8.4 1.2.5l.2 1.1a1 1 0 0 0 1 .8h1.4a1 1 0 0 0 1-.8l.2-1.1c.4-.1.8-.3 1.2-.5l1.1.7a1 1 0 0 0 1.3-.2l1.4-1.4a1 1 0 0 0 .2-1.3l-.7-1.1c.2-.4.4-.8.5-1.2l1.1-.2a1 1 0 0 0 .8-1v-1.4a1 1 0 0 0-.8-1Z"
                fill="currentColor"
            />
        </svg>
    ),
};

export default function NavigationBar() {
    const location = useLocation();
    const { user, logout } = useAuth();

    const sections = [
        { name: "Home", path: "home" },
        { name: "messages", path: "chats" },
        { name: "notifications", path: "notifications" },
        { name: "search", path: "search" },
        { name: "Profile", path: user?._id ? `user/${user._id}` : "settings" },
        { name: "settings", path: "settings" },
    ];

    const current = location.pathname.split("/")[1] || "home";

    return (
        <aside className="flex h-full min-h-screen w-full max-w-[260px] flex-col justify-between rounded-[32px] border border-slate-200 bg-slate-950/95 p-5 text-slate-100 shadow-2xl md:w-[280px]">
            <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-4 shadow-xl ring-1 ring-white/10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500 text-xl font-black text-white shadow-lg">
                            W
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">
                                Winston
                            </p>
                            <p className="text-xs text-slate-400">Workspace</p>
                        </div>
                    </div>
                </div>

                <nav className="space-y-2">
                    {sections.map((section) => {
                        const isActive = current === section.path.split("/")[0];
                        return (
                            <Link key={section.name} to={section.path}>
                                <div
                                    className={`group flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-medium transition duration-300 ${
                                        isActive
                                            ? "border-blue-500 bg-blue-500/20 text-white shadow-sm"
                                            : "border-transparent bg-white/5 text-slate-200 hover:border-slate-500/40 hover:bg-white/10"
                                    }`}
                                >
                                    <span
                                        className={`shrink-0 ${isActive ? "text-blue-300" : "text-slate-400 group-hover:text-slate-200"}`}
                                    >
                                        {icons[section.name]}
                                    </span>
                                    <span className="capitalize">
                                        {section.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 shadow-inner">
                    <p className="font-semibold text-white">Signed in as</p>
                    <p className="truncate text-sm text-slate-300">
                        @{user?.username || "guest"}
                    </p>
                </div>
                <button
                    onClick={logout}
                    className="flex w-full items-center justify-center gap-2 rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                    <span>Log out</span>
                </button>
            </div>
        </aside>
    );
}
