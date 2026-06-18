import { useState } from "react";
import { useClanActions } from "../hooks/useClanActions";

export default function ClanCreationModal({ setShowModal }) {
    const [form, setForm] = useState({
        clanName: "",
        description: "",
        visibility: "public",
        avatarFile: null,
    });

    const { handleCreateClan } = useClanActions();

    const [error, setError] = useState({});

    const incompleteForm = !(form.clanName && form.description);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "avatarFile") {
            const file = e.target.files[0];

            if (!file) return;

            setForm((prev) => ({ ...prev, [name]: file }));
        } else setForm((prev) => ({ ...prev, [name]: value }));

        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        if (!form.clanName) {
            setError((prev) => ({
                ...(prev || {}),
                clanName: {
                    msg: "Please enter a clan name",
                    timestamp: Date.now(),
                },
            }));
        }

        if (!form.description) {
            setError((prev) => ({
                ...(prev || {}),
                description: {
                    msg: "Please enter a description",
                    timestamp: Date.now(),
                },
            }));
        }

        if (!form.visibility) {
            console.log("Not visibility");
            setError((prev) => ({
                ...(prev || {}),
                visibility: {
                    msg: "Visibility will default to Public if not selected",
                    timestamp: Date.now(),
                },
            }));
        }

        if (incompleteForm) {
            return;
        }

        const data = await handleCreateClan(form);

        console.log(data);

        setForm({
            clanName: "",
            description: "",
            visibility: "public",
            avatarFile: null,
        });

        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-2xl p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)]">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                            Create a Clan
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Build a space for your community, friends, or shared
                            interests.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-6"
                >
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">
                            Clan Name
                        </span>

                        <input
                            type="text"
                            value={form.clanName}
                            name="clanName"
                            onChange={handleChange}
                            placeholder="Give your clan a memorable name"
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
                        />

                        {error?.clanName && (
                            <p
                                className={`text-[#E35D6A] text-sm px-1 animate-error-pop`}
                            >
                                {error.clanName.msg}
                            </p>
                        )}
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">
                            Description
                        </span>

                        <textarea
                            rows={4}
                            value={form.description}
                            name="description"
                            onChange={handleChange}
                            placeholder="Tell people what your clan is about..."
                            className="resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
                        />

                        {error?.description && (
                            <p
                                className={`text-[#E35D6A] text-sm px-1 animate-error-pop`}
                            >
                                {error.description.msg}
                            </p>
                        )}
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700">
                            Clan Photo
                        </span>

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                            <input
                                type="file"
                                accept="image/*"
                                name="avatarFile"
                                onChange={handleChange}
                            />
                        </div>

                        {form.avatarFile && (
                            <img
                                src={URL.createObjectURL(form.avatarFile)}
                                alt="Preview"
                                className="mt-3 h-24 w-24 rounded-full object-cover border border-slate-200"
                            />
                        )}
                    </label>

                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-slate-700">
                            Visibility
                        </span>

                        <div className="grid grid-cols-3 gap-3">
                            <label
                                className={`cursor-pointer rounded-2xl border p-4 transition ${form.visibility === "public" ? "border-slate-900 bg-slate-100" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"}`}
                            >
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="public"
                                    checked={form.visibility === "public"}
                                    onChange={handleChange}
                                    className={`mb-2 ${form.visibility === "public" ? "h-5 w-5" : ""} accent-slate-900`}
                                />
                                <p className="font-semibold">Public</p>
                                <p className="text-xs text-slate-500">
                                    Anyone can discover and join.
                                </p>
                            </label>

                            <label
                                className={`cursor-pointer rounded-2xl border p-4 transition ${form.visibility === "invite-only" ? "border-slate-900 bg-slate-100" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"}`}
                            >
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="invite-only"
                                    onChange={handleChange}
                                    checked={form.visibility === "invite-only"}
                                    className={`mb-2 ${form.visibility === "invite-only" ? "h-5 w-5" : ""} accent-slate-900`}
                                />
                                <p className="font-semibold">Invite Only</p>
                                <p className="text-xs text-slate-500">
                                    Members join through invitations.
                                </p>
                            </label>

                            <label
                                className={`cursor-pointer rounded-2xl border p-4 transition ${form.visibility === "private" ? "border-slate-900 bg-slate-100" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"}`}
                            >
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="private"
                                    checked={form.visibility === "private"}
                                    onChange={handleChange}
                                    className={`mb-2 ${form.visibility === "private" ? "h-5 w-5" : ""} accent-slate-900`}
                                />
                                <p className="font-semibold">Private</p>
                                <p className="text-xs text-slate-500">
                                    Hidden from public discovery.
                                </p>
                            </label>
                        </div>

                        {error?.visibility && (
                            <p
                                className={`text-[#E35D6A] text-sm px-1 animate-error-pop`}
                            >
                                {error.visibility.msg}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            type="button"
                            onClick={() => {
                                setForm({
                                    clanName: "",
                                    description: "",
                                    visibility: "public",
                                    avatarFile: null,
                                });

                                setError({});
                            }}
                            className="rounded-2xl border border-slate-200 px-5 py-3 font-medium text-slate-600 transition hover:bg-slate-100"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className={`rounded-2xl  px-5 py-3 font-medium text-white transition ${incompleteForm ? "bg-gray-300 hover:bg-gray-300 disabled" : "bg-slate-900 hover:bg-slate-800"}`}
                        >
                            Create Clan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
