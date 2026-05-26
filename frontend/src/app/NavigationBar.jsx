import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthProvider";
import { useChatNotifications } from "../features/notification/hooks/useChatNotifications";

export default function NavigationBar() {
    const map = useChatNotifications();
    let totalMessages = Object.values(map).reduce(
        (total, unread) => total + unread,
        0
    );

    console.log(totalMessages);
    const location = useLocation();
    const { user, logout } = useAuth();

    const pathname = location.pathname;

    const sections = [
        {
            name: "Home",
            path: "/home",
            active: pathname === "/" || pathname === "/home",
        },
        {
            name: "messages",
            path: "/chats",
            active: pathname.startsWith("/chats"),
        },
        {
            name: "notifications",
            path: "/notifications",
            active: pathname.startsWith("/notifications"),
        },
        {
            name: "search",
            path: "/search",
            active: pathname.startsWith("/search"),
        },
        {
            name: "Profile",
            path: `/user/${user._id}`,
            active: pathname === `/user/${user._id}`,
        },
        {
            name: "settings",
            path: "/settings",
            active: pathname.startsWith("/settings"),
        },
    ];

    return (
        <div className="flex flex-col justify-between gap-10 py-2">
            <div className="flex flex-col gap-4 justify-center">
                {sections.map((section) => (
                    <Link to={section.path} key={section.name}>
                        <div
                            className={`
                                p-2 text-xs border border-gray-300 rounded-md font-medium
                                hover:-translate-y-0.5 hover:bg-blue-600
                                transition-all duration-300 relative
                                ${section.active ? "bg-blue-500 text-white" : ""}
                            `}
                        >
                            {section.name}
                        </div>
                    </Link>
                ))}
            </div>

            <button
                onClick={logout}
                className="bg-white text-black !text-xs !text-left border border-gray-300 !p-2 w-full hover:-translate-y-0.5 hover:bg-red-600 transition-all duration-300 relative"
            >
                logout
            </button>
        </div>
    );
}
