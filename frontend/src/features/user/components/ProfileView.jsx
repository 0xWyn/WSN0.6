import Actions from "./Actions";
import Cover from "./CoverImage";
import Identity from "./Identity";
import ProfilePicture from "./ProfilePicture";

export default function ProfileView({ user }) {
    const { name, username, bio, avatar, cover, following, followers } = user;

    return (
        <div className="w-full">
            <Cover cover={user?.cover?.url ?? null} />

            {/* Header */}
            <div className="relative -mt-16 rounded-[28px] border border-white/60 bg-white/50 backdrop-blur-2xl p-5 sm:mx-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7">
                {/* Content */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    {/* Identity */}
                    <div className="flex min-w-0 items-end gap-4">
                        <div className="pointer-events-none">
                            <ProfilePicture user={user} />
                        </div>

                        <div className="min-w-0 pb-1">
                            <Identity user={user} />
                            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                                <span>{followers?.length ?? 0} followers</span>

                                <span className="text-slate-300">•</span>

                                <span>{following?.length ?? 0} following</span>
                            </div>
                        </div>
                    </div>
                    {/* Actions */}
                    <Actions user={user} />
                </div>
                {/* Bio + Stats */}

                {bio && (
                    <div className="mt-6 max-w-2xl border-t border-slate-100 pt-5">
                        <p className="text-sm leading-7 text-slate-600">
                            {bio}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
