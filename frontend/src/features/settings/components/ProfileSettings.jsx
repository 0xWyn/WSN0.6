import { useState } from "react";
import { useAuth } from "../../auth/context/AuthProvider";
import Pencil from "../../../components/icons/pencil";
import AvatarCropper from "../../../utils/AvatarCropper";
import { getCroppedImg } from "../../../utils/getCroppedImg";

export default function ProfileSettings({ onEdit }) {
    const { user, setUser } = useAuth();
    const [preview, setPreview] = useState(null);
    const [previewCover, setPreviewCover] = useState(null);
    const [showCrop, setShowCrop] = useState(null);

    const [form, setForm] = useState({
        username: "",
        bio: "",
        avatar: null,
        cover: null,
    });

    const avatarUrl = user?.avatar
        ? `http://localhost:3001${user.avatar}`
        : null;
    const coverUrl = user?.cover ? `http://localhost:3001${user.cover}` : null;

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = form.username.trim() ? form.username : user.username;
        const bio = form.bio.trim() ? form.bio : user.bio;

        const data = new FormData();

        data.append("username", username);
        data.append("bio", bio);

        if (form.avatar) {
            data.append("avatar", form.avatar);
        }

        if (form.cover) {
            data.append("cover", form.cover);
        }

        onEdit(data);
        setIsEditing(false);
        console.log("Submitted");
    };

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type !== "file") {
            setForm((form) => ({
                ...form,
                [name]: type === "file" ? files[0] : value,
            }));
        }

        if (type === "file") {
            const file = files[0];

            if (name === "avatar") {
                setPreview(URL.createObjectURL(file));
                setShowCrop(true);
            } else if (name === "cover") {
                setPreviewCover(URL.createObjectURL(file));
            }
        }
    };

    const handleCropDone = async (croppedAreaPixels) => {
        if (!croppedAreaPixels) {
            setShowCrop(false);
            return;
        }
        const croppedBlob = await getCroppedImg(preview, croppedAreaPixels);

        const croppedFile = new File(
            [croppedBlob],
            "avatar.jpg", // 👈 IMPORTANT
            { type: "image/jpeg" }
        );
        setForm((f) => ({ ...f, avatar: croppedFile }));

        setPreview(URL.createObjectURL(croppedFile));
        setShowCrop(false);
    };

    //     return (
    //         <div className="h-full flex flex-col w-full px-2">
    //             <div className="flex justify-between items-center">
    //                 <h1 className="!text-3xl mb-2">Profile Settings</h1>
    //                 <button
    //                     className="!p-1 !aspect-square hover:outline-2 hover:outline-blue-600 hover:text-blue-600 active:bg-blue-300 transition-colors duration-300ms"
    //                     onClick={() => setIsEditing((isEditing) => !isEditing)}
    //                 >
    //                     <Pencil />
    //                 </button>
    //             </div>
    //             <div className="border border-gray-300 rounded-md h-full px-5">
    //                 <form
    //                     onSubmit={handleSubmit}
    //                     className=" h-full flex flex-col gap-10 p-4"
    //                 >
    //                     <div>
    //                         <div className="flex gap-2 items-center mb-2">
    //                             <p className="font-bold">Username:</p>
    //                             {isEditing ? (
    //                                 <label htmlFor="username" className="w-full">
    //                                     <input
    //                                         type="text"
    //                                         id="username"
    //                                         value={form.username}
    //                                         name="username"
    //                                         placeholder={`${user.username}`}
    //                                         onChange={handleChange}
    //                                         className="border border-gray-400 w-full p-2"
    //                                     />
    //                                 </label>
    //                             ) : (
    //                                 <div className="border border-gray-400 rounded-md w-full p-2 bg-gray-100">
    //                                     <p>{user.username}</p>
    //                                 </div>
    //                             )}
    //                         </div>
    //                         <hr className="text-gray-400" />
    //                     </div>

    //                     <div>
    //                         <div className="flex gap-2 items-center mb-2">
    //                             <p className="font-bold">Bio:</p>
    //                             {isEditing ? (
    //                                 <label htmlFor="bio" className="w-full">
    //                                     <input
    //                                         type="text"
    //                                         id="bio"
    //                                         name="bio"
    //                                         value={form.bio}
    //                                         placeholder={`${user.bio}`}
    //                                         onChange={handleChange}
    //                                         className="border border-gray-400 w-full p-2"
    //                                     />
    //                                 </label>
    //                             ) : (
    //                                 <div className="border border-gray-400 rounded-md w-full p-2 bg-gray-100">
    //                                     <p
    //                                         className={`${!user?.bio?.trim() ? "text-gray-400 text-sm text-center" : ""}`}
    //                                     >
    //                                         {user?.bio?.trim()
    //                                             ? user.bio
    //                                             : "You have not filled a bio yet"}
    //                                     </p>
    //                                 </div>
    //                             )}
    //                         </div>
    //                         <hr className="text-gray-400" />
    //                     </div>

    //                     {/* Avatar */}
    //                     <div>
    //                         <div className="flex gap-2 items-center mb-2">
    //                             <p className="font-bold">Avatar: </p>
    //                             {isEditing ? (
    //                                 <div>
    //                                     <label
    //                                         htmlFor="avatar"
    //                                         className="cursor-pointer"
    //                                     >
    //                                         Upload Avatar
    //                                         <input
    //                                             type="file"
    //                                             name="avatar"
    //                                             id="avatar"
    //                                             accept="image/*"
    //                                             onChange={handleChange}
    //                                             className="hidden"
    //                                         />
    //                                     </label>

    //                                     {preview && (
    //                                         <div className="size-16 rounded-full overflow-hidden">
    //                                             <img
    //                                                 src={preview}
    //                                                 className="w-full h-full object-cover"
    //                                             />
    //                                         </div>
    //                                     )}
    //                                 </div>
    //                             ) : user?.avatar?.trim() ? (
    //                                 <div className="size-20 overflow-hidden rounded-full">
    //                                     <img
    //                                         src={avatarUrl}
    //                                         alt="Avatar"
    //                                         className="w-full h-full object-cover"
    //                                     />
    //                                 </div>
    //                             ) : (
    //                                 <p>You have not uploaded a picture</p>
    //                             )}
    //                         </div>
    //                         <hr className="text-gray-400" />
    //                     </div>

    //                     {/* Cover Image */}
    //                     <div>
    //                         <div className="flex gap-2 items-center mb-2">
    //                             <p className="font-bold">Cover Image: </p>
    //                             {isEditing ? (
    //                                 <div>
    //                                     <label
    //                                         htmlFor="cover"
    //                                         className="cursor-pointer"
    //                                     >
    //                                         Upload Cover Image
    //                                         <input
    //                                             type="file"
    //                                             name="cover"
    //                                             id="cover"
    //                                             accept="image/*"
    //                                             onChange={handleChange}
    //                                             className="hidden"
    //                                         />
    //                                     </label>

    //                                     {previewCover && (
    //                                         <div className="size-16 rounded-full overflow-hidden">
    //                                             <img
    //                                                 src={previewCover}
    //                                                 className="w-full h-full object-cover"
    //                                             />
    //                                         </div>
    //                                     )}
    //                                 </div>
    //                             ) : user?.cover?.trim() ? (
    //                                 <div className="size-20 overflow-hidden rounded-full">
    //                                     <img
    //                                         src={coverUrl}
    //                                         alt="Cover"
    //                                         className="w-full h-full object-cover"
    //                                     />
    //                                 </div>
    //                             ) : (
    //                                 <p>You have not uploaded a cover image</p>
    //                             )}
    //                         </div>
    //                         <hr className="text-gray-400" />
    //                     </div>
    //                     <div className="w-full">
    //                         {isEditing && (
    //                             <button className="bg-blue-400">Save</button>
    //                         )}
    //                     </div>
    //                 </form>

    //                 {showCrop && (
    //                     <AvatarCropper
    //                         image={preview}
    //                         onComplete={handleCropDone}
    //                     />
    //                 )}
    //             </div>
    //         </div>
    //     );

    return (
        <div className="h-full w-full px-2 overflow-y-auto">
            <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Profile Settings
                    </h1>

                    <button
                        onClick={() => setIsEditing((v) => !v)}
                        className="
                        rounded-xl
                        bg-white/60
                        px-4
                        py-2
                        font-medium
                        backdrop-blur
                        border
                        border-white/50
                        transition
                        hover:bg-white/80
                    "
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* Profile Preview */}
                <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl shadow-sm">
                    <div className="relative h-48 bg-gradient-to-r from-sky-200 via-blue-200 to-indigo-200">
                        {(previewCover || coverUrl) && (
                            <img
                                src={previewCover || coverUrl}
                                alt="Cover"
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>

                    <div className="px-6 pb-6">
                        <div className="-mt-12 flex flex-col sm:flex-row sm:items-end gap-4">
                            <div className="size-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                                {preview || avatarUrl ? (
                                    <img
                                        src={preview || avatarUrl}
                                        alt="Avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-200 to-sky-200 text-3xl font-bold text-slate-800">
                                        {user?.username
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="pb-2">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {user.username}
                                </h2>

                                <p className="text-slate-500">
                                    {user?.bio?.trim()
                                        ? user.bio
                                        : "No bio added yet"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-6 shadow-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8"
                    >
                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-slate-700"
                            >
                                Username
                            </label>

                            {isEditing ? (
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    placeholder={user.username}
                                    onChange={handleChange}
                                    className="
                                    mt-2
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white/70
                                    p-3
                                    outline-none
                                    transition
                                    focus:border-blue-400
                                "
                                />
                            ) : (
                                <div className="mt-2 rounded-2xl bg-white/50 p-3">
                                    {user.username}
                                </div>
                            )}
                        </div>

                        {/* Bio */}
                        <div>
                            <label
                                htmlFor="bio"
                                className="block text-sm font-semibold text-slate-700"
                            >
                                Bio
                            </label>

                            {isEditing ? (
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={4}
                                    value={form.bio}
                                    placeholder={
                                        user.bio || "Tell people about yourself"
                                    }
                                    onChange={handleChange}
                                    className="
                                    mt-2
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white/70
                                    p-3
                                    resize-none
                                    outline-none
                                    transition
                                    focus:border-blue-400
                                "
                                />
                            ) : (
                                <div className="mt-2 rounded-2xl bg-white/50 p-3 min-h-[100px]">
                                    {user?.bio?.trim()
                                        ? user.bio
                                        : "You have not filled a bio yet"}
                                </div>
                            )}
                        </div>

                        {/* Upload Section */}
                        {isEditing && (
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Avatar Upload */}
                                <div>
                                    <p className="mb-2 text-sm font-semibold text-slate-700">
                                        Avatar
                                    </p>

                                    <label
                                        htmlFor="avatar"
                                        className="
                                        flex
                                        min-h-[120px]
                                        cursor-pointer
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-slate-300
                                        bg-white/40
                                        transition
                                        hover:bg-white/60
                                    "
                                    >
                                        <span className="font-medium">
                                            Upload Avatar
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            JPG, PNG
                                        </span>

                                        <input
                                            type="file"
                                            name="avatar"
                                            id="avatar"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Cover Upload */}
                                <div>
                                    <p className="mb-2 text-sm font-semibold text-slate-700">
                                        Cover Image
                                    </p>

                                    <label
                                        htmlFor="cover"
                                        className="
                                        flex
                                        min-h-[120px]
                                        cursor-pointer
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-slate-300
                                        bg-white/40
                                        transition
                                        hover:bg-white/60
                                    "
                                    >
                                        <span className="font-medium">
                                            Upload Cover
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            JPG, PNG
                                        </span>

                                        <input
                                            type="file"
                                            name="cover"
                                            id="cover"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Save */}
                        {isEditing && (
                            <button
                                type="submit"
                                className="
                                rounded-2xl
                                bg-blue-500
                                py-3
                                font-semibold
                                text-white
                                shadow-lg
                                transition
                                hover:bg-blue-600
                            "
                            >
                                Save Changes
                            </button>
                        )}
                    </form>
                </div>

                {showCrop && (
                    <AvatarCropper
                        image={preview}
                        onComplete={handleCropDone}
                    />
                )}
            </div>
        </div>
    );
}
