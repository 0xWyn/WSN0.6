import { useParams } from "react-router-dom";
import LocNav from "../../../components/ui/LocNav";
import { useProfile } from "../hooks/useProfile";
import ProfileView from "./ProfileView";
import { useEntities } from "../../global/EntityProvider";
import Posts from "./Posts";

export default function UserPage() {
    const { id } = useParams();
    const { loading, user } = useProfile(id);

    if (loading || !user) return <div>Loading...</div>;

    return (
        <section className="relative isolate w-full overflow-hidden bg-[#f8fafc]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 size-[32rem] rounded-full bg-amber-100/50 blur-3xl"></div>
                <div className="absolute right-0 bottom-0 size-[28rem] rounded-full bg-sky-100/40 blur-3xl"></div>
            </div>
            <LocNav current={`@${user.username}`} />

            <div className="mx-auto w-full max-w-5xl px-4">
                <ProfileView user={user} />

                {/* Posts */}
                <Posts userId={user._id} />
            </div>
        </section>
    );
}
