import { Link } from "react-router-dom";

export default function ProfilePicture({ user }) {
    return (
        <Link
            to={`/user/${user?._id}`}
            className="
                relative shrink-0
            "
        >
            {/* ambient glow */}
            <div className="absolute inset-0 rounded-full bg-sky-200/40 blur-2xl" />

            <div className="relative size-24 sm:size-28 md:size-32 overflow-hidden rounded-full border-4 border-white/90 bg-gradient-to-br from-sky-400 to-blue-500 shadow-[0_10px_40px_rgba(59,130,246,0.18)]">
                {user?.avatar?.url ? (
                    <img
                        src={user.avatar.url}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-white">
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                )}
            </div>
        </Link>
    );
}
