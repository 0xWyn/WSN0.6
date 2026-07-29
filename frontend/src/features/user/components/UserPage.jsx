import { useParams } from "react-router-dom";
import LocNav from "../../navigation/components/LocNav";
import { useProfile } from "../hooks/useProfile";
import { useUserSocket } from "../web/useUserSocket";
import Posts from "./Posts";
import ProfileView from "./ProfileView";

export default function UserPage() {
    const { id } = useParams();
    const { loading, user } = useProfile(id);

    useUserSocket();

    if (loading || !user) return <div>Loading...</div>;

    return (
        <section className="relative isolate w-full bg-[#f8fafc]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 size-[32rem] rounded-full bg-amber-100/50 blur-3xl"></div>
                <div className="absolute right-0 bottom-0 size-[28rem] rounded-full bg-sky-100/40 blur-3xl"></div>
            </div>

            <div className="sticky top-0 z-40 w-full flex bg-white/70 backdrop-blur-2xl">
                <LocNav current={`@${user.username}`} />
            </div>

            <div className="mx-auto w-full max-w-5xl px-4">
                <ProfileView user={user} />

                {/* Posts */}
                <Posts userId={user._id} />
            </div>
        </section>
    );
}
