import ClanContainer from "./ClanContainer.jsx";
import CreateClan from "./CreateClan.jsx";
import LocNav from "../../../components/ui/LocNav.jsx";
import ClanCreationModal from "./ClanCreationModal.jsx";

import { useClan } from "../context/ClanProvider.jsx";
import { useState } from "react";

export default function HomePage() {
    const { loading } = useClan();

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {!showModal && (
                <div className="w-full h-full min-h-0 flex flex-col">
                    <LocNav current="My Clans" />

                    <div className="relative bg-[#f8fafc] px-4 py-6 flex-1 min-h-0">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className="absolute left-1/4 top-0 size-[36rem] rounded-full bg-amber-100/40 blur-3xl" />
                            <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
                        </div>
                        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                                <main className="flex-1 flex flex-col gap-6">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <ClanContainer />
                                    )}
                                    <CreateClan setShowModal={setShowModal} />
                                </main>
                            </div>
                        </div>

                        <div>
                            <h1>Explore</h1>
                        </div>
                    </div>
                </div>
            )}

            {showModal && <ClanCreationModal setShowModal={setShowModal} />}
        </>
    );
}
