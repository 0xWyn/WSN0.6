import { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LocNav from "../../navigation/components/LocNav";
import { useFetchEntity } from "../../../helpers/useFetchEntity";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";

export default function UserNetwork() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useProfile(id);

    if (!user) return;

    const getActive = (title) =>
        location.pathname.includes(title.toLowerCase());

    const menuButtons = {
        followers: {
            title: "Followers",
            to: "../network/followers",
            active: getActive("followers"),
        },
        following: {
            title: "Following",
            to: "../network/following",
            active: getActive("following"),
        },
    };

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] relative flex flex-col">
            {/* Ambience */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden">
                <div className="absolute left-80 lg:left-1/4 top-0 size-[26rem] lg:size-[40rem] rounded-full bg-amber-200/15 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 z-40">
                <LocNav current={`@${user.username}`} />
            </div>

            {/* Main */}
            <div className="flex flex-col items-center bg-white/20 backdrop-blur-xl flex-1 min-h-0 h-full mx-20 rounded-[20px] p-2">
                <div className="w-full max-w-xl lg:max-w-5xl flex-1 min-h-0 flex flex-col">
                    <div className="flex w-full py-2 justify-around px-6 gap-2">
                        {Object.values(menuButtons).map(
                            ({ title, to, active }) => (
                                <button
                                    onClick={() => navigate(to)}
                                    className={`w-full border py-3 bg-white/30 rounded-[12px] border-white/80 backdrop-blur-3xl ${active ? "text-slate-600 shadow-[0_5px_8px_rgba(150,150,200,0.05)]" : "text-slate-400"} hover:bg-white/80 tracking-[0.01rem]`}
                                >
                                    {title}
                                </button>
                            )
                        )}
                    </div>
                    <div className="flex-1 min-h-0 flex flex-col">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
