import { Link, Outlet } from "react-router-dom";
import LocNav from "../../../components/ui/LocNav";

// export default function Settings() {
//     return (
//         <div className="w-full h-full">
//             <div className="w-full flex">
//                 <LocNav current="Settings" />
//                 <SecondaryNavigation />
//             </div>
//             <div className="min-h-0 flex-1 bg-white rounded-md w-full p-2 flex gap-1">
//                 <div className="h-full w-80 border border-gray-300 rounded-md flex flex-col gap-10 p-4 text-2xl font-medium">
//                     <div>
//                         <Link to={`/settings/profile`}>
//                             <p>Profile</p>
//                             <hr className="text-gray-400" />
//                         </Link>
//                     </div>
//                     <div>
//                         <Link to={`/settings/account`}>
//                             <p>Account</p>
//                             <hr className="text-gray-400" />
//                         </Link>
//                     </div>
//                     <div>
//                         <Link to={`/settings/notifications`}>
//                             <p>Notifications</p>
//                             <hr className="text-gray-400" />
//                         </Link>
//                     </div>
//                 </div>
//                 <div className="flex-1 min-w-0 h-full">
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useLocation } from "react-router-dom";

export default function Settings() {
    const location = useLocation();

    const items = [
        {
            label: "Profile",
            path: "/settings/profile",
            icon: "👤",
        },
        {
            label: "Account",
            path: "/settings/account",
            icon: "🔒",
        },
        {
            label: "Notifications",
            path: "/settings/notifications",
            icon: "🔔",
        },
    ];

    return (
        <div className="flex h-full min-h-0 flex-col">
            <LocNav current="Settings" />

            <div className="relative flex-1 overflow-hidden bg-[#f8fafc]">
                {/* Background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />
                    <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
                </div>

                <div className="relative z-10 h-full p-6">
                    <div className="mx-auto flex h-full max-w-7xl flex-col gap-6">
                        {/* Header */}
                        <header className="rounded-[36px] border border-white/60 bg-white/35 p-8 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                                Settings
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                Manage your profile, account security,
                                notifications, and preferences.
                            </p>
                        </header>

                        {/* Content */}
                        <div className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[280px_1fr]">
                            {/* Sidebar */}
                            <aside className="rounded-[32px] border border-white/60 bg-white/35 p-4 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                                <div className="flex flex-col gap-2">
                                    {items.map((item) => {
                                        const active =
                                            location.pathname === item.path;

                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                            >
                                                <div
                                                    className={`
                                                        flex items-center gap-4
                                                        rounded-2xl px-4 py-4
                                                        transition-all duration-300
                                                        ${
                                                            active
                                                                ? "bg-white shadow-md text-slate-900"
                                                                : "hover:bg-white/60 text-slate-600"
                                                        }
                                                    `}
                                                >
                                                    <span>{item.icon}</span>

                                                    <span className="font-medium">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </aside>

                            {/* Main Content */}
                            <section className="min-h-0 overflow-auto rounded-[32px] border border-white/60 bg-white/35 p-6 backdrop-blur-2xl shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
                                <Outlet />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
