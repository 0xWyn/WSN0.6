import { useClan } from "../context/ClanProvider";
import ClanCard from "./ClanCard";

export default function ClanContainer({ posts }) {
    const { clans, loading } = useClan();

    if (loading) return null;

    const mappedClans = Object.values(clans).map((clan) => {
        return <ClanCard key={clan._id} clan={clan} />;
    });

    return (
        <section className="flex w-full flex-col gap-5">
            {mappedClans.length ? (
                mappedClans
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
                    Join a clan to start connecting.
                </div>
            )}
        </section>
    );
}
