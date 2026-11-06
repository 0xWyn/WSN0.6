import { useNavigate } from "react-router-dom";
import { NotificationGraphics as graphic } from "../../../config/notification-graphics";
import { NotificationInterpreter } from "../services/NotificationInterpreter";

export default function NotificationCard({ notification }) {
    const { msg, avatar, event, source } =
        NotificationInterpreter(notification);

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(source)}
            className={`group relative rounded-3xl border backdrop-blur-2xl px-3 py-2 cursor-pointer shadow-[0px_2px_8px_rgba(15,23,100,0.05)] transition-all duration-300 hover:shadow-[0px_2px_8px_rgba(15,23,100,0.09)] flex gap-2 items-center ${notification.readAt ? "bg-slate-950/7 hover:bg-slate-50/20 border-none" : "bg-white/60 hover:bg-white/80 border-white"}`}
        >
            {/* Icon */}
            <span
                className={`${graphic[event]?.bg_color} p-1 rounded-md size-6 flex items-center`}
            >
                {graphic[event]?.icon}
            </span>

            {/* Msg & Graphic */}
            <div className="flex justify-between items-center w-full">
                <p className="text-sm leading-6 text-slate-600 truncate">
                    {msg}
                </p>

                <div className="h-12 w-10">
                    {avatar && typeof avatar === "string" && (
                        <div className="size-full overflow-hidden outline-2 outline-white rounded-md text-xs shrink-0">
                            <img
                                src={avatar ? avatar : null}
                                alt="avatar"
                                className="size-12 object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
