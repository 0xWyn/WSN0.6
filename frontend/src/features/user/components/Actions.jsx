import { useAuth } from "../../auth/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../hooks/useUserActions";
const variants = {
    primary: `
        bg-slate-900
        text-white
        shadow-[0_8px_20px_rgba(15,23,42,0.14)]
        hover:translate-y-[-1px]
        hover:bg-slate-800
    `,

    secondary: `
        !border !border-white/70
        !bg-white/60
        text-slate-700
        backdrop-blur-xl
        hover:bg-white/80
    `,
};
const ActionButton = ({ text, onClick, variant = "primary" }) => {
    return (
        <button
            onClick={onClick}
            className={`!rounded-full !px-5 !py-2 !text-sm !font-medium !transition-all duration-200  hover:translate-y-[-1px] ${variants[variant]}`}
        >
            {text}
        </button>
    );
};

export default function Actions({ user }) {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const isOwnProfile = user._id.toString() === currentUser._id;

    const { followUser } = useUserActions(user._id);

    const editProfile = () => {
        navigate("/settings/profile");
    };

    const messageUser = () => {
        navigate(`/chats/user/${user._id}`);
    };

    return (
        <div className="flex gap-3">
            {isOwnProfile ? (
                <ActionButton
                    text="Edit Profile"
                    variant="primary"
                    onClick={editProfile}
                />
            ) : (
                <>
                    <ActionButton
                        text="Follow"
                        variant="primary"
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
