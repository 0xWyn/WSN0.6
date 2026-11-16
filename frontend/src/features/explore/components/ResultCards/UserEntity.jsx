import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../auth/hooks/useCurrentUser";

export default function UserEntity({ entity: user }) {
    const auth = useCurrentUser();
    const isCurrentUser = auth._id === user._id;
    const navigate = useNavigate();

    const viewAccount = () => {
        navigate(`/user/${user._id}`);
    };

    return (
        <div
            className={`relative w-full flex justify-between rounded-2xl border border-white/70 shadow-[0_5px_10px_rgba(20,10,17,0.04)] bg-white/40 backdrop-blur-md p-2 transition-all duration-300 hover:bg-white/55 hover:shadow-[0_6px_20px_rgba(20,10,17,0.07)]`}
        >
            {/* User */}
            <div className="flex items-center gap-3 w-full">
                {/* Avatar */}
                <button
                    onClick={viewAccount}
                    className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-amber-200 to-sky-300 ring-2 ring-white/80 shadow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                    aria-label={`View ${user.username}'s profile`}
                >
                    {user.avatar?.url ? (
                        <img
                            src={user.avatar.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-700">
                            {user.username?.charAt(0).toUpperCase()}
                        </span>
                    )}
                </button>

                {/* User Information */}

                <button
                    onClick={viewAccount}
                    className="min-w-0 flex-1 text-left rounded-xl py-1 transition-colors"
                >
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate text-sm font-medium text-slate-800">
                            {user.name}
                        </span>

                        {isCurrentUser && (
                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                                You
                            </span>
                        )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                        <span className="truncate text-xs text-slate-500">
                            @{user.username}
                        </span>
                    </div>
                </button>
            </div>

            {/* Menu */}
            {/* {!isCurrentUser && (
                <div className="relative shrink-0" ref={menuRef}>
                    <button
                        onClick={() => setShowMenu((v) => !v)}
                        aria-label={`Actions for ${user.username}`}
                        aria-expanded={showMenu}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100/80 hover:text-slate-700 active:scale-[1.2] transition-all duration-300 ${showMenu ? "bg-slate-100/80 text-slate-700" : ""} `}
                    >
                        <EllipsisHorizontal />
                    </button>

                    {showMenu && <MemberMenu member={member} />}
                </div>
            )} */}
        </div>
    );
}
