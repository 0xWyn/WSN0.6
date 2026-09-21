import { useEffect, useState } from "react";
import { UserRoundCog } from "../../../components/icons/user-round-cog";
import XMark from "../../../components/icons/x-mark";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { useUser } from "../context/UserProvider";
import { useUserActions } from "../hooks/useUserActions";
import AvatarCropper from "../../../utils/AvatarCropper";
import { useMediaLogic } from "../hooks/useMediaLogic";
import { AssetCropper } from "./AssetCropper";

export default function EditProfile() {
    const { setIsEditing } = useUser();
    const user = useCurrentUser();
    const { editProfile, loading } = useUserActions();

    const [form, setForm] = useState({
        cover: user.cover,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        bio: user.bio,
    });

    const {
        mediaPreview,
        handleCropDone,
        cropping,
        setSelectedFile,
        selectedFile,
        setCropping,
    } = useMediaLogic(setForm);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const res = await editProfile(form);

            console.log(res);
            if (!loading.editProfile && res.status === 200) {
                console.log("Hitting this");
                setIsEditing(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectFile = (field, file) => {
        setSelectedFile({ field: field, file: file });
        setCropping(true);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isChanged = Object.entries(form).some(
        ([key, value]) => value !== user[key]
    );

    return (
        <div className="fixed inset-0 top-0 left-0 z-100 h- w-full bg-black/20 backdrop-blur-sm flex items-center justify-center px-12">
            {cropping && (
                <AssetCropper
                    image={selectedFile.file}
                    field={selectedFile.field}
                    onComplete={handleCropDone}
                    onCancel={() => setCropping(false)}
                />
            )}

            {/* Main child */}
            <div className="bg-white/85 border border-white backdrop-blur-3xl w-full max-w-xl lg:max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-lg flex flex-col gap-4 px-7 py-9">
                {/* Header */}
                <div className="flex shrink-0 items-center w-full justify-between px-2">
                    <div className="">
                        <div className="flex items-center gap-2">
                            <UserRoundCog />
                            <h1 className="text-2xl font-bold">Edit Profile</h1>
                        </div>
                        <p className="mt-1 text-slate-500 text-sm">
                            Update your profile information.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-slate-500 hover:text-slate-700 p-1 rounded-full hover:bg-white/80 border border-transparent hover:border-white transition duration-200"
                    >
                        <XMark />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="min-h-0 flex-1 rounded-3xl space-y-6 overflow-y-auto no-scrollbar py-2 px-2"
                >
                    {/* Graphic Elements */}
                    <div className="relative aspect-[3/1]">
                        {/* Cover */}
                        <label
                            htmlFor="cover"
                            className="block h-full w-full relative active:scale-[0.97] transition duration-300 group cursor-pointer overflow-hidden border border-white/80 rounded-3xl"
                        >
                            <input
                                type="file"
                                className="hidden"
                                id="cover"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    handleSelectFile("cover", file);
                                }}
                            />

                            <span className="pointer-events-none absolute top-4 left-4 border-slate-200 bg-slate-100 p-2 rounded-xl text-slate-800 opacity-0 group-hover:opacity-100 transtion duration-300 bg-white/70 backdrop-blur-xl text-sm px-4">
                                {form.cover ? "Change cover" : "Upload cover"}
                            </span>
                            {mediaPreview.cover ? (
                                <img
                                    src={mediaPreview.cover}
                                    alt="Cover image"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-blue-300 to-sky-200 flex items-center justify-center uppercase font-bold text-slate-50 text-sm tracking-wide hover:from-blue-500 hover:to-sky-400 transition duration-300">
                                    Cover Image
                                </div>
                            )}
                        </label>

                        {/* AVATAR */}
                        <label
                            htmlFor="avatar"
                            className="absolute h-30 w-30 aspect-square max-w-30 rounded-full bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-white cursor-pointer group transition duration-300 hover:bg-slate-100 active:scale-[0.95] flex items-center"
                        >
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    handleSelectFile("avatar", file);
                                }}
                            />
                            <div className="h-full w-full rounded-full overflow-hidden border border-sky-200 ring-4 ring-sky-100/90 shadow-[0_0_12px_rgba(186,230,253,0.9),0_0_30px_rgba(125,211,252,0.5)]">
                                {mediaPreview.avatar ? (
                                    <img
                                        src={mediaPreview.avatar}
                                        alt={form.name}
                                        className="object-cover h-full w-full"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center bg-white/20 justify-center font-bold text-4xl text-slate-600">
                                        {form.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <span className="pointer-events-none block absolute left-0 right-0 top-12 py-2 rounded-2xl text-slate-800 bg-white/30 backdrop-blur-lg text-sm opacity-0 group-hover:opacity-100 transtion duration-300 text-center">
                                {form.avatar
                                    ? "Change avatar"
                                    : "Upload avatar"}
                            </span>
                        </label>
                    </div>

                    {/* Text */}

                    <div className="mt-20 rounded-[24px] border border-slate-200/70 bg-white/50 p-5">
                        <div className="mb-5">
                            <h2 className="text-sm font-semibold text-slate-800">
                                Profile Information
                            </h2>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                This is how your profile will appear to other
                                people.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {["name", "username", "bio"].map((field) => (
                                <label
                                    htmlFor={field}
                                    className="block"
                                    key={field}
                                >
                                    <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                                        {field}:
                                    </span>
                                    {field === "bio" ? (
                                        <textarea
                                            id={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            maxLength={160}
                                            rows={4}
                                            className="resize-none outline-none bg-white/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 transition rounded-[20px] font-normal w-full hover:border-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100/60"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            id={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            className="resize-none outline-none bg-white/80 border border-slate-200 px-4 py-3 text-sm text-slate-900 transition rounded-[20px] font-normal w-full hover:border-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100/60"
                                        />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <button
                            disabled={loading.editProfile || !isChanged}
                            className={`w-full flex gap-2 justify-center items-center rounded-[20px] py-3 my-1 transition duration-300 border ${!isChanged || loading.editProfile ? "opacity-90 !cursor-default text-slate-400 border-slate-200 bg-gray-200" : "bg-gradient-to-br from-blue-800 to-sky-700 text-white !shadow-[0px_4px_12px_rgba(14,165,233,0.15)] border-white/70 hover:scale-[1.01] active:scale-[0.98]"}`}
                        >
                            <span className="">
                                {loading.editProfile ? "Saving" : "Done"}
                            </span>

                            {loading.editProfile && (
                                <div className="size-4 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
