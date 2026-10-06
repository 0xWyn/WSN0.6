import { useEffect, useState } from "react";
import Write from "../../../../../components/icons/write";
export default function ClanProfile({ clan, onEdit }) {
    const [editing, setEditing] = useState({
        avatar: false,
        cover: false,
        name: false,
        description: false,
    });

    const [avatarPreview, setAvatarPreview] = useState(null);

    const [details, setDetails] = useState({
        avatar: clan.avatar,
        name: clan.name,
        banner: clan.banner,
        description: clan.description,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDetails((prev) => ({ ...prev, [name]: value }));

        onEdit(name, value);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setAvatarPreview(URL.createObjectURL(file));

        setDetails((prev) => ({ ...prev, avatar: file }));

        onEdit("avatar", file);
    };

    const displayAvatar = avatarPreview || clan.avatar?.url || null;

    useEffect(() => {
        return () => {
            avatarPreview ? URL.revokeObjectURL(avatarPreview) : null;
        };
    }, [avatarPreview]);

    return (
        <div>
            <div className="overflow-hidden relative rounded-[26px] bg-white/35 backdrop-blur-2xl p-5 border border-white/60 shadow-[0_6px_30px_rgba(80,90,100,0.02)]">
                {/* Background accents */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-20 -right-20 size-48 rounded-full bg-sky-200/25 blur-3xl" />
                    <div className="absolute -bottom-20 -left-16 size-44 rounded-full bg-amber-200/25 blur-3xl" />
                </div>

                {/* Inner glass highlight */}
                <div className="pointer-events-none absolute inset-px rounded-[25px] border border-white/40" />

                {/* Header */}
                <div className="relative flex flex-col items-center gap-4">
                    {/* Avatar */}
                    <label
                        htmlFor="avatar"
                        className="group relative cursor-pointer"
                    >
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        <div className="relative size-28 overflow-hidden rounded-[28px] border-4 border-white/70 bg-gradient-to-br from-amber-200 to-sky-200 shadow transition-transform duration-300 group-hover:scale-[1.025] overflow-hidden">
                            {displayAvatar ? (
                                <img
                                    src={displayAvatar}
                                    alt={clan.name}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <div className="flex size-full items-center justify-center text-3xl font-medium text-slate-700">
                                    {clan.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className=" rounded-[22px] absolute inset-0 flex items-center justify-center bg-slate-900/25 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
                                <span className="border border-white/40 px-3 py-1 font-medium tracking-wider bg-white/60 backdrop-blur-md rounded-full  text-slate-700 shadow-sm text-[10px] uppercase">
                                    Change
                                </span>
                            </div>
                        </div>

                        <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-white/80 bg-white/75 text-slate-600 shadow-sm backdrop-blur-xl">
                            <Write />
                        </span>
                    </label>

                    {/* Identity */}
                    <div className="mt-5 w-full text-center">
                        {editing.name ? (
                            <input
                                autoFocus
                                type="text"
                                name="name"
                                value={details.name}
                                onChange={handleChange}
                                onBlur={() =>
                                    setEditing((prev) => ({
                                        ...prev,
                                        name: false,
                                    }))
                                }
                                className="w-full bg-transparent px-2 text-center text-2xl font-semibold tracking-tight text-slate-800 outline-none"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    setEditing((prev) => ({
                                        ...prev,
                                        name: true,
                                    }))
                                }
                                className="group/name relative mx-auto block max-w-full"
                            >
                                <span className="text-2xl font-semibold tracking-tight text-slate-800">
                                    {clan.name}
                                </span>

                                <span className="absolute ml-2 bottom-0 text-slate-400 opacity-0 transition-opacity group-hover/name:opacity-100 p-1 border border-white/70 rounded-xl bg-white/80">
                                    <Write />
                                </span>
                            </button>
                        )}

                        {editing.description ? (
                            <textarea
                                autoFocus
                                rows={2}
                                name="description"
                                value={details.description}
                                onChange={handleChange}
                                onBlur={() =>
                                    setEditing((prev) => ({
                                        ...prev,
                                        description: false,
                                    }))
                                }
                                className="mt-2 w-full resize-none bg-transparent px-6 text-center text-sm leading-6 text-slate-500 outline-none"
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    setEditing((prev) => ({
                                        ...prev,
                                        description: true,
                                    }))
                                }
                                className="group/description mx-auto mt-1 block max-w-xl text-center relative"
                            >
                                <span className="text-sm leading-6 text-slate-500">
                                    {clan.description ||
                                        "A place for members to connect, share ideas, and participate in discussions."}
                                </span>

                                <span className="absolute ml-2 bottom-0 text-slate-400 opacity-0 transition-opacity group-hover/description:opacity-100 p-1 border border-white/70 rounded-xl bg-white/80">
                                    <Write />
                                </span>
                            </button>
                        )}

                        {/* Access */}
                        <div className="mt-3 flex justify-center">
                            <span
                                className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                                    clan.access?.toLowerCase() === "private"
                                        ? "text-amber-600"
                                        : "text-emerald-600"
                                }`}
                            >
                                <span
                                    className={`size-1.5 rounded-full ${
                                        clan.access?.toLowerCase() === "private"
                                            ? "bg-amber-400"
                                            : "bg-emerald-400"
                                    }`}
                                />
                                {clan.access || "Public"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
