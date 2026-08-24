import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bars3 } from "../../../components/icons/hamburger";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

const icons = {
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

const OptionsMenu = () => {
    return (
        <div className="absolute w-md h-42 shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 border transition-all duration-300 top-10 z-300"></div>
    );
};

export default function SecondaryNavigation() {
    const auth = useCurrentUser();

    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const pathname = location.pathname;

    const sections = [
        {
            name: "Profile",
            path: `/user/${auth._id}`,
            active: pathname === `/user/${auth._id}`,
        },
    ];

    return (
        <div className="h-14 flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/60 !bg-white/20 px-4 border-black relative z-50">
            {sections.map((section) => (
                <div key={section.name} onClick={() => navigate(section.path)}>
                    <div
                        className={`group flex items-center gap-4 rounded-[24px] px-4 py-3 transition-all duration-300 cursor-pointer ${
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

                        <span className="font-medium">{section.name}</span>
                    </div>
                </div>
            ))}
            <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="border"
            >
                <Bars3 />
            </button>
            {showMenu && <OptionsMenu />}
        </div>
    );
}
