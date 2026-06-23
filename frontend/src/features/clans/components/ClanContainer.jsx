import { useClan } from "../context/ClanProvider";
import ClanCard from "./ClanCard";

export default function ClanContainer({ posts }) {
    const { clans, loading } = useClan();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 text-slate-500">
                Loading clans...
            </div>
        );
    }

    const mappedClans = Object.values(clans).map((clan) => {
        return <ClanCard key={clan._id} clan={clan} />;
    });

    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
            {mappedClans.length > 0 ? (
                mappedClans
            ) : (
                <div className="col-span-full rounded-[32px] border border-dashed border-slate-300 bg-white/60 p-12 text-center backdrop-blur-xl">
                    <h3 className="font-semibold text-slate-800">
                        No clans yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Create your first clan and start building a community.
                    </p>
                </div>
            )}
        </section>
    );
}
