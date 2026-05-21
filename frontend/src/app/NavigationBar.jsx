import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthProvider";
export default function NavigationBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const sections = [
        { name: "Home", path: "home" },
        { name: "messages", path: "chats" },
        { name: "notifications", path: "notifications" },
        { name: "search", path: "search" },
        { name: `Profile`, path: `user/${user._id}` },
        { name: "settings", path: "settings" },
    ];

    const current = location.pathname.split("/")[1] || "home";
    return (
        <div className="flex flex-col justify-between gap-10 py-2">
            <div className="flex flex-col gap-4 justify-center">
                {sections.map((section) => (
                    <Link to={section.path} key={section.name}>
                        <div
                            className={`p-2 text-xs border border-gray-300 rounded-md font-medium hover:-translate-y-0.5 hover:bg-blue-600 transition-all duration-300 relative ${current === section.path.split("/")[0] ? "bg-blue-500 text-white" : ""}`}
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
