import { Link } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
const sizes = {
    8: "size-8",
    10: "size-10",
    12: "size-12",
    14: "size-14",
    16: "size-16",
    18: "size-18",
    20: "size-20",
    22: "size-22",
    24: "size-24",
    26: "size-26",
    28: "size-28",
    30: "size-30",
};
export default function Avatar({ size = 12, user = { username: "G" } }) {
    const { user: currentUser, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    const avatarUrl = user?.avatar;

    return (
        <Link to={`/user/${user?._id}`} onClick={(e) => e.stopPropagation()}>
            <div
                className={`${sizes[size]} overflow-hidden rounded-full flex items-center justify-center shrink-0 pointer-events-auto bg-gradient-to-b from-sky-400 to-blue-500 text-white`}
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-center"
                    />
                ) : (
                    <p className="text-lg font-bold">
                        {user?.username?.charAt(0).toUpperCase() || "?"}
                    </p>
                )}
            </div>
        </Link>
    );
}
