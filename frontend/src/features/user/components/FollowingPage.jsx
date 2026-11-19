import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useUserActions } from "../hooks/useUserActions";
import ContactContainer from "./ContactContainer";

export default function FollowingPage() {
    const { id } = useParams();

    const { fetchUserFollowing } = useUserActions(id);

    useEffect(() => {
        fetchUserFollowing();
    }, [id]);

    const { loadingUser, connections } = useUser();

    const loading = loadingUser.following;
    const follows = connections?.following || [];

    return (
        <div className="flex flex-col min-h-0 flex-1">
            {loading && <div>Loading...</div>}

            {Object.values(follows).length && !loading > 0 ? (
                <ContactContainer entities={follows} />
            ) : (
                <div className="w-full flex justify-center px-6 mt-6">
                    <div className="rounded-[24px] border border-dashed border-slate-200 bg-white/30 backdrop-blur-xl px-6 py-10 text-center w-full">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl text-lg">
                            ✦
                        </div>

                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                            No follows.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
