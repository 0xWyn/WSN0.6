import Actions from "./Actions";
import Bio from "./Bio";
import Cover from "./CoverImage";
import Identity from "./Identity";
import Posts from "./Posts";
import ProfilePicture from "./ProfilePicture";
import Stats from "./Stats";

export default function ProfileView({ user }) {
    const { name, username, bio, avatar, cover, following, followers } = user;

    return (
        <section className="relative isolate w-full overflow-hidden bg-[#f8fafc]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 size-[32rem] rounded-full bg-amber-100/50 blur-3xl"></div>
                <div className="absolute right-0 bottom-0 size-[28rem] rounded-full bg-sky-100/40 blur-3xl"></div>
            </div>
            <Cover cover={cover} />

            <div className="mx-auto w-full max-w-5xl px-4">
                <div className="relative -mt-16 rounded-[32px] border border-white/60 bg-white/45 backdrop-blur-2xl p-6 shadow-[0_10px_60px_rgba(15,23,42,0.08)] md:p-10">
                    {/* Header */}
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        {/* Identity */}
                        <div className="flex items-end gap-4">
                            <ProfilePicture user={user} />
                            <Identity user={user} />
                        </div>
                        {/* Actions */}
                        <Actions user={user} />
                    </div>
                    {/* Bio + Stats */}
                    <div className="mt-8 grid gap-6 md:grid-cols-[1fr_260px]">
                        <Bio bio={bio} />
                        <Stats following={following} followers={followers} />
                    </div>
                </div>
                {/* Posts */}
                <Posts user={user} />
            </div>
        </section>
    );
}
