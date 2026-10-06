import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EllipsisHorizontal } from "../../../../components/icons/ellipsis-horizontal";
import { useCurrentUser } from "../../../auth/hooks/useCurrentUser";
import { useClanManagement } from "../../context/ClanManagementProvider";
import { useClanSettings } from "../../hooks/useClanSettings";
import { useModMenu } from "../../hooks/useModMenu";

export default function Members() {
    const { id } = useParams();
    const { fetchClanMembers, loadingClanSettings } = useClanSettings(id);

    const fetchedFor = useRef(null);

    useEffect(() => {
        if (fetchedFor.current === id) return;

        fetchedFor.current = id;
        fetchClanMembers(1);
    }, [id]);

    const { members, hasMore } = useClanManagement();
    if (loadingClanSettings.fetchMembers) return <div>Loading...</div>;

    console.log(members);
    return (
        <div className="flex flex-col gap-2 overflow-y-auto h-full">
            {Object.values(members).map((membership) => (
                <MemberCard key={membership._id} member={membership} />
            ))}
        </div>
    );
}

const MemberCard = ({ member }) => {
    const { user, role } = member;
    const auth = useCurrentUser();

    const isCurrentUser = auth._id === user._id;
    const navigate = useNavigate();

    const viewAccount = () => {
        navigate(`/user/${user._id}`);
    };

    const menuRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const roleColors = {
        founder: "text-purple-400",
        leader: "text-yellow-400",
        member: "text-slate-400",
    };
    return (
        <div
            className={`relative w-full flex justify-between rounded-2xl border border-white/70 shadow-[0_5px_10px_rgba(20,10,17,0.04)] bg-white/40 backdrop-blur-md p-2 transition-all duration-300 hover:bg-white/55 hover:shadow-[0_6px_20px_rgba(20,10,17,0.07)] ${showMenu ? "z-50" : ""}`}
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

                        {role && (
                            <>
                                <span className="text-slate-300">•</span>
                                <span
                                    className={`truncate text-[9px] font-semibold uppercase ${roleColors[role]}`}
                                >
                                    {" "}
                                    {role}
                                </span>
                            </>
                        )}
                    </div>
                </button>
            </div>

            {/* Menu */}
            {!isCurrentUser && (
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
            )}
        </div>
    );
};

const MemberMenu = ({ member }) => {
    const { user, role } = member;

    const { actions, menuItems } = useModMenu(member);

    const roleTextColors = {
        founder: "text-purple-500",
        leader: "text-yellow-500",
        member: "text-slate-500",
    };

    const roleBgColors = {
        founder: "bg-purple-100",
        leader: "bg-yellow-100",
        member: "bg-slate-100",
    };
    return (
        <div className="absolute right-0 top-full z-200 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-xl">
            {/* Identity*/}
            <div className="border-b py-3 px-4 border-slate-100">
                <p className="truncate text-sm font-semibold text-slate-800">
                    {user.name}
                </p>

                <p className="text-xs text-slate-500">@{user.username}</p>

                <samp
                    className={`mt-2 inline-flex rounded-full ${roleBgColors[role]} px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${roleTextColors[role]}`}
                >
                    {role}
                </samp>
            </div>

            {Object.entries(actions).map(([key, value]) => {
                const { title, permission } = value;

                if (permission) {
                    return (
                        <MenuSection key={title} title={title}>
                            {Object.values(menuItems[key]).map(
                                ({ title, visible, onClick, destructive }) => {
                                    if (visible) {
                                        return (
                                            <MenuItem
                                                key={title}
                                                onClick={onClick}
                                                destructive={destructive}
                                            >
                                                {title}
                                            </MenuItem>
                                        );
                                    }
                                }
                            )}
                        </MenuSection>
                    );
                }
            })}
        </div>
    );
};

const MenuSection = ({ title, children }) => {
    return (
        <div className="px-2 py-1 border-b border-slate-100">
            <p className="px-2 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {title}
            </p>

            <div className="space-y-0.5">{children}</div>
        </div>
    );
};

const MenuItem = ({ children, destructive = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full rounded-xl px-2.5 py-1 !font-normal text-left text-sm transition-colors ${destructive ? "text-red-600 hover:bg-red-50" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
    >
        <span className="text-slate-200">•</span> {children}
    </button>
);
