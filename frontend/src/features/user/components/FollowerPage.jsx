import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useUserActions } from "../hooks/useUserActions";
import ContactContainer from "./ContactContainer";

export default function FollowerPage() {
    const { id } = useParams();

    const { fetchUserFollowers } = useUserActions(id);

    useEffect(() => {
        if (!id) return;

        fetchUserFollowers(id);
    }, [id]);

    const { loadingUser, connections } = useUser();

    if (loadingUser.followers) return <div>Loading...</div>;

    const followers = connections?.followers || [];

    console.log(followers);
    return (
        <div className="flex flex-col min-h-0 flex-1">
            {Object.values(followers).length > 0 ? (
                <ContactContainer entities={followers} />
            ) : (
                <div className="flex items-center justify-center">
                    No followers.
                </div>
            )}
        </div>
    );
}
