import LocNav from "../../navigation/components/LocNav";
import ProfileSettings from "./ProfileSettings";

import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Settings() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("Profile");

    const items = [
        {
            label: "Profile",
            icon: "👤",
            component: ProfileSettings,
        },
        {
            label: "Account",
            icon: "🔒",
            component: null,
        },
        {
            label: "Notifications",
            icon: "🔔",
            component: null,
        },
    ];

    return (
        <div className="relative flex flex-col h-full">
            {/* Background */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden ">
                <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/60">
                <LocNav current="Settings" />
            </div>

            {/* Main */}
            <div className="p-6 z-40 flex-1 min-h-0 flex items-center justify-center border-2 overflow-hidden">
                {/* Main Child */}
                <div className="h-full flex flex-wrap items-start justify-center gap-6 py-6 px-8 w-full max-w-6xl backrop-blur-xl border border-white/60 bg-white/40 rounded-[28px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden">
                    {/* Sidebar */}
                    <aside className="space-y-8 p-4 flex flex-col">
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                            Settings
                        </h1>
                        <div className="flex flex-col gap-2">
                            {items.map((item) => {
                                const active = activeSection === item.label;
                                return (
                                    <div
                                        key={item.label}
                                        onClick={() =>
                                            setActiveSection(item.label)
                                        }
                                    >
                                        <div
                                            className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${active ? "bg-white shadow-md text-slate-900" : "hover:bg-white/60 text-slate-600"}`}
                                        >
                                            <span>{item.icon}</span>

                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Content */}

                    {items.map((item) =>
                        item.label === activeSection && item.component ? (
                            <item.component />
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}
