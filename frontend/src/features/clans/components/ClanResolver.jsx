import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import { useEffect, useState } from "react";
import { getClanById } from "../api/clanApis";
import { useClan } from "../context/ClanProvider";
import XMark from "../../../components/icons/x-mark";
import LockKeyhole from "../../../components/icons/lock-keyhole";
import { useClanActions } from "../hooks/useClanActions";
export default function ClanResolver() {
    const { id: clanId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { clanEntities } = useClan();

    const clan = clanEntities[clanId];

    if (clan?.visibility === "public" || clan?.members?.includes(user._id))
        return <Outlet />;

    const data = ["1", "2", "3", "4"];

    export const PrivateGate = () => {
        return (
            <div className="relative overflow-hidden flex-1">
                <div className="absolute z-100 h-full min-h-0 min-w-0 bg-slate-900/20 backdrop-blur-xl flex flex-1 items-center justify-center inset-0">
                    <div className="max-w-md bg-white/80 backdrop-blur-sm rounded-3xl border border-white/90 shadow-md flex flex-col gap-4 p-8">
                        <button
                            className="absolute top-4 bg-white/10 hover:bg-white text-black right-4 rounded-full p-1 transition-all duration-300"
                            onClick={() => navigate("/explore")}
                        >
                            <XMark />
                        </button>
                        <h3 className="text-2xl font-medium text-left flex items-center gap-2">
                            <LockKeyhole />
                            Private Clan
                        </h3>

                        <div className="relative mb-10">
                            <div
                                className={`h-43 rounded-2xl overflow-hidden ${clan?.banner ? "" : "bg-gradient-to-r from-indigo-300 to-blue-400 flex items-center justify-center hover:from-indigo-400 hover:to-blue-500 transition duration-200 hover:shadow-lg group"}`}
                            >
                                {clan?.banner ? (
                                    <div className="w-full h-full relative">
                                        <div className="h-full w-full bg-gradient-to-b from-transparent-0 to-slate-800 opacity-50 absolute top-0" />
                                        <img
                                            src={clan?.banner.url}
                                            alt="clan banner"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <p className="font-medium tracking-wider">
                                            Banner
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="size-26 rounded-full bg-slate-100/60 backdrop-blur-lg ring-4 ring-white/70 flex items-center justify-center absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 transition duration-200 group overflow-hidden">
                                {clan?.avatar && (
                                    <img
                                        src={clan?.avatar.url}
                                        alt="clan avatar"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>

                        <h1 className="text-5xl font-medium text-left">
                            {clan?.name}
                        </h1>

                        <div className="p-2 space-y-2">
                            {data.map((dat, index) => (
                                <div className="border border-slate-400 h-10 w-full rounded-lg flex items-center">
                                    {index === 0 && (
                                        <p>
                                            👥
                                            {clan?.members.length} member
                                            {clan?.members.length > 1
                                                ? "s"
                                                : ""}
                                        </p>
                                    )}

                                    {index === 1 && (
                                        <p>
                                            🔒
                                            {clan?.owner}
                                        </p>
                                    )}
                                    {index === 2 && <p>{clan?.createdAt}</p>}
                                    {index === data.length - 1 && (
                                        <p className="leading-4 text-sm text-slate-600">
                                            <span className="font-medium">
                                                {clan?.name}
                                            </span>{" "}
                                            is a private clan. You must be
                                            permitted to join to view the clan.
                                            Request access to join.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="">
                            <button className=" bg-gradient-to-r from-blue-500 to-violet-500 text-white p-2 px-4 rounded-2xl w-100">
                                Request Access
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none">
                    <Outlet />
                </div>
            </div>
        );
    };

    return <PrivateGate />;
}
