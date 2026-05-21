import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocNav from "../../../components/ui/LocNav";
import { useFeedPosts } from "../../feed/hooks/useFeedPosts";
import { useProfile } from "../hooks/useProfile";
import ProfileView from "./ProfileView";

export default function UserPage() {
    const { id } = useParams();
    const { user, loading, error } = useProfile(id);
    const { fetchUserPosts } = useFeedPosts();
    const [doneTime, setDoneTime] = useState(false);

    useEffect(() => {
        if (!user) return;
        fetchUserPosts(user._id, 1);
    }, [user]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDoneTime(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const isLoading = (
        <p className="uppercase font-bold text-sm letter tracking-widest bg-gradient-to-r from-blue-300 via-blue-600 to-red-500 bg-clip-text text-transparent">
            Loading...
        </p>
    );

    if (error) return <p>Error!</p>;

    return (
        <div name="Profile View" className="w-full h-full">
            {!loading && doneTime ? (
                <div>
                    <LocNav current={`@${user.username}`} />
                    <ProfileView user={user} />
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    {isLoading}
                </div>
            )}
        </div>
    );
}
