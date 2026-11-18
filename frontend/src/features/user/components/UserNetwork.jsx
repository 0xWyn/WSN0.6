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

    const { loading, user } = useProfile(id);

    if (!user) return;
    return (
        <div className="w-full min-h-screen bg-[#f8fafc] relative">
            {/* Ambience */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/15 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 z-40">
                <LocNav current={`@${user.username}`} />
            </div>

            <div className="flex">
                <button>
                    <Link to="../network/followers">Followers</Link>
                </button>
                <div className="h-full w-1 bg-inherit" />
                <button>
                    <Link to="../network/following">Following</Link>
                </button>
            </div>

            {/* Main */}
            <div className="overflow-y-auto no-scrollbar flex flex-col flex-1 gap-8 md:px-12 py-2 items-center min-h-0">
                <section className="space-y-2 w-full">
                    {/* <h1 className="uppercase tracking-wide font-[11px] font-bold text-slate-700">
                {section}
            </h1> */}

                    <Outlet />
                </section>
            </div>
        </div>
    );
}
