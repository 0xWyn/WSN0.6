import { useParams } from "react-router-dom";
import LocNav from "../../../components/ui/LocNav";
import { useProfile } from "../hooks/useProfile";
import ProfileView from "./ProfileView";

export default function UserPage() {
    const { id } = useParams();
    const { loading, user } = useProfile(id);

    if (loading) return <div>Loading...</div>;

    return (
        <div name="Profile View" className="w-full h-full">
            <div>
                <LocNav current={`@${user.username}`} />
                <ProfileView user={user} />
            </div>
        </div>
    );
}
