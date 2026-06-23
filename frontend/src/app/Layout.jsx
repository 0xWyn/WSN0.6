import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import SlickNav from "./SlickNav";
import ClanCreationModal from "../features/clans/components/ClanCreationModal";
import { useState } from "react";
import { useClan } from "../features/clans/context/ClanProvider";
export default function Layout() {
    const { showClanModal } = useClan();

    return (
        <div className="flex w-screen items-stretch gap-2 bg-white overflow-x-scroll ">
            <SlickNav />
            <div className="flex-1 min-w-0 w-full h-screen overflow-y-auto">
                <Outlet />
            </div>
            {showClanModal && <ClanCreationModal />}
        </div>
    );
}
