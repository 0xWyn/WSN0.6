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

    if (loadingUser.following) return <div>Loading...</div>;

    const follows = connections?.following || [];

    return (
        <div className="flex flex-col min-h-0 flex-1">
            {follows.length > 0 ? (
                <ContactContainer entities={follows} />
            ) : (
                <div className="flex items-center justify-center">
                    Does not follow anyone.
                </div>
            )}
        </div>
    );
}
