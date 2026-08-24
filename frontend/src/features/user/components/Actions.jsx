import { useAuth } from "../../auth/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../context/UserProvider";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

const ActionButton = ({ text, onClick, variant = "primary" }) => {
    const variants = {
        primary: `bg-slate-900 text-slate-300 shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:translate-y-[-1px] hover:bg-slate-800 hover:text-slate-50`,
        secondary: `border border-slate-100 bg-white/60 text-slate-700 backdrop-blur-xl hover:bg-white hover:text-slate-950
    `,
    };

    return (
        <button
            onClick={onClick}
            className={`rounded-full px-5 py-2 text-xs sm:text-sm transition-all duration-300 hover:translate-y-[-1px] ${variants[variant]}`}
        >
            {text}
        </button>
    );
};

export default function Actions({ user }) {
    const navigate = useNavigate();
    const auth = useCurrentUser();
    const isOwnProfile = user._id.toString() === auth._id;
    const { setIsEditing } = useUser();
    const { followUser } = useUserActions(user._id);

    const editProfile = () => {
        setIsEditing(true);
    };

    const messageUser = () => {
        navigate(`/chats/user/${user._id}`);
    };

    return (
        <div className="flex gap-2">
            {isOwnProfile ? (
                <ActionButton
                    text="Edit Profile"
                    variant="primary"
                    onClick={editProfile}
                />
            ) : (
                <>
                    <ActionButton
                        text={`${user.isFollowing ? "Following" : "Follow"}`}
                        variant={`${user.isFollowing ? "primary_alt" : "primary"}`}
                        onClick={followUser}
                    />
                    <ActionButton
                        text="Message"
                        variant="secondary"
                        onClick={messageUser}
                    />
                </>
            )}
        </div>
    );
}
