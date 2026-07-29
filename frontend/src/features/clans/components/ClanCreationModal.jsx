import { useEffect, useRef, useState } from "react";
import { useClan } from "../context/ClanProvider";
import { toSentenceCase } from "../../../utils/toSentenceCase";
import Camera from "../../../components/icons/camera";
import Earth from "../../../components/icons/earth";
import LockKeyhole from "../../../components/icons/lock-keyhole";
import { Pickaxe } from "../../../components/icons/pickaxe";
import { useClanActions } from "../hooks/useClanActions";
import ExclamationCircle from "../../../components/icons/exclamation-circle";
import { useNavigate } from "react-router-dom";
import { INTEREST_DOMAINS } from "../../../config/interestDomains";
import { ChevronDoubleRight } from "../../../components/icons/chevron-double-right";
import { ChevronDown } from "../../../components/icons/chevron-down";

export default function ClanCreationModal() {
    const { handleCreateClan, creatingClan } = useClanActions();
    const { setShowClanModal } = useClan();
    const navigate = useNavigate();
    const inputRef = useRef();
    const [tagInput, setTagInput] = useState("");
    const [showTopicMenu, setShowTopicMenu] = useState(false);

    const [form, setForm] = useState({
        banner: null,
        avatar: null,
        name: "",
        description: "",
        domain: "",
        tags: [],
        visibility: "Public",
    });
    const [error, setError] = useState({});

    const visibility = [
        {
            name: "Public",
            icon: <Earth />,
        },
        {
            name: "Private",
            icon: <LockKeyhole />,
        },
    ];

    const validateForm = () => {
        const errors = {};
        if (!form.name.trim()) {
            errors.name = "Choose a name for your clan";
        }

        if (!form.description.trim()) {
            errors.description =
                "Adding a short description helps your clan stand out";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const errors = validateForm();
            setError(errors);

            if (Object.values(errors).length > 0) {
                console.log("Errors");
                return;
            }

            const response = await handleCreateClan(form);

            console.log(response);

            setForm({
                banner: null,
                avatar: null,
                name: "",
                description: "",
                domain: "",
                tags: [],
                visibility: "Public",
            });

            // navigate(`/c/${response.newClan._id}`);
            setShowClanModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError((prev) => ({ ...prev, [name]: null }));
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const tag = tagInput.trim().toLowerCase();
            if (!tag) return;

            if (form.tags.includes(tag)) {
                setTagInput("");
                return;
            }

            setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
            setTagInput("");
        }

        if (e.key === "Backspace" && tagInput === "" && form.tags.length > 0) {
            setForm((prev) => ({
                ...prev,
                tags: prev.tags.slice(0, -1),
            }));
        }
    };

    const selectedTopic = INTEREST_DOMAINS.find(
        (domain) => domain.name === form.domain
    );
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(form.avatar);
            URL.revokeObjectURL(form.banner);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div
                className={`w-full max-w-xl lg:max-w-2xl rounded-[32px] border border-white/60 bg-white/90 p-9 px-7 shadow-[0_20px_80px_rgba(15,23,42,0.12)] space-y-3 transition-opacity duration-200 max-h-[90vh] flex flex-col ${
                    creatingClan
                        ? "pointer-events-none opacity-80 backdrop-blur-sm"
                        : "backdrop-blur-3xl"
                }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-2">
                    <div className="px-1">
                        <div className="flex items-center gap-3">
                            <span className="rounded-lg">
                                <Pickaxe size={26} />
                            </span>

                            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 ">
                                Create a Clan
                            </h2>
                        </div>

                        <p className="my-1 text-sm leading-6 text-slate-500">
                            Build a space for your community, friends, or shared
                            interests.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowClanModal(false)}
                        className="flex h-10 w-10 items-center justify-center !rounded-full bg-slate-100 text-slate-600 !transition hover:bg-white/90"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <form
                    onSubmit={handleSubmit}
                    className={`flex-1 overflow-y-auto no-scrollbar px-2 pb-8 space-y-6`}
                >
                    {/* Visual */}
                    <div className="relative mb-10">
                        <label
                            htmlFor="banner"
                            className="h-43 bg-gradient-to-r from-indigo-300 to-blue-400 flex items-center justify-center rounded-3xl relative cursor-pointer hover:from-indigo-400 hover:to-blue-500 active:scale-98 transition duration-200 hover:shadow-lg group overflow-hidden"
                        >
                            {form.banner ? (
                                <img
                                    src={URL.createObjectURL(form.banner)}
                                    alt="Selected banner"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="font-medium tracking-wider">
                                        {toSentenceCase("add banner image")}
                                    </p>
                                    <p className="text-sm text-slate-700">
                                        Recommended (1500 * 500)
                                    </p>
                                </div>
                            )}

                            <input
                                type="file"
                                id="banner"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (!file) return;

                                    setForm((prev) => ({
                                        ...prev,
                                        banner: file,
                                    }));

                                    e.target.value = "";
                                    return;
                                }}
                            />
                            <span className="opacity-0 group-hover:opacity-100 absolute top-4 left-4 transtion duration-300 text-xs font-medium tracking-wide bg-slate-100/70 p-2 rounded-3xl text-slate-700">
                                {toSentenceCase("Click to upload")}
                            </span>
                        </label>

                        <label
                            htmlFor="avatar"
                            className="size-26 rounded-full bg-slate-100/60 backdrop-blur-lg border border-white/70 flex items-center justify-center absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-slate-100/70 active:scale-98 transition duration-200 group overflow-hidden"
                        >
                            {form.avatar ? (
                                <img
                                    src={URL.createObjectURL(form.avatar)}
                                    alt="Selected avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Camera />
                            )}
                            <input
                                type="file"
                                id="avatar"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setForm((prev) => ({
                                        ...prev,
                                        avatar: file,
                                    }));
                                    e.target.value = "";
                                    return;
                                }}
                            />
                            <span className="absolute text-xs font-medium top-15 text-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-md p-1 rounded-3xl shadow-xs">
                                Upload avatar
                            </span>
                        </label>
                    </div>

                    {/* Text */}
                    <div className="space-y-4 rounded-2xl px-2 relative">
                        {/* Name */}
                        <div className="flex flex-col space-y-1">
                            <p
                                className={`text-sm font-medium ml-1 ${error.name ? "text-rose-500 animate-error-pop" : ""} flex items-center gap-1`}
                            >
                                Name
                                {error.name && <ExclamationCircle />}
                            </p>

                            <input
                                name="name"
                                value={form.name}
                                className={`px-3 py-2 rounded-3xl bg-white/70 border border-white/90 text-slate-700 placeholder:text-slate-400 text-[14px] flex outline-none h-12 items-center`}
                                placeholder="e.g, Golf Royalty"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col space-y-1">
                            <p
                                className={`text-sm font-medium ml-1 ${error.description ? "text-rose-500 animate-error-pop" : ""} flex items-center gap-1`}
                            >
                                Description
                                {error.description && <ExclamationCircle />}
                            </p>

                            <textarea
                                name="description"
                                rows={4}
                                value={form.description}
                                className="px-3 py-2 rounded-3xl bg-white/70 border border-white/90 text-slate-700 placeholder:text-slate-400 text-[14px] flex outline-none resize-none"
                                placeholder="Tell people what your clan is about"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Domain */}

                        <div className="flex flex-col space-y-1 relative">
                            {/* Write Up */}
                            <div className="flex justify-between">
                                <div className="space-y-1">
                                    <div className="flex gap-2">
                                        <p
                                            className={`text-sm font-medium ml-1 ${error.domain ? "text-rose-500 animate-error-pop" : ""} flex gap-1 items-center`}
                                        >
                                            Topic
                                            {error.domain && (
                                                <ExclamationCircle />
                                            )}
                                        </p>
                                        <button
                                            type="button"
                                            className="flex h-10 w-10 p-3 items-center justify-center !rounded-full bg-slate-10 !text-slate-900 !transition duration-200 hover:bg-white/90"
                                            onClick={() =>
                                                setShowTopicMenu(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            <ChevronDown />
                                        </button>
                                    </div>
                                    <p className="text-slate-500 text-sm ml-1">
                                        Pick a topic to help other users find
                                        your clan.
                                    </p>
                                </div>
                            </div>

                            {selectedTopic && (
                                <span
                                    className={`flex shrink-0 whitespace-nowrap !items-center !justify-center gap-2 !px-3 !py-1 !rounded-full text-[14px] text-slate-800 bg-white/90 shadow-md hover:scale-98 hover:bg-slate-100 hover:ring hover:ring-amber-500 transition-all duration-200 border font-medium border-indigo-700 cursor-pointer`}
                                    onClick={() => setShowTopicMenu(true)}
                                >
                                    {selectedTopic.icon}
                                    {selectedTopic.name}
                                </span>
                            )}
                            {/* TopicMenu */}
                            {showTopicMenu && (
                                <div className="absolute flex flex-wrap items-start bg-white w-full h-80 z-100 p-6 px-6 rounded-3xl shadow-lg backdrop-blur-4xl space-y-3 space-x-2 overflow-y-hidden overflow-y-scroll no-scrollbar top-12">
                                    {INTEREST_DOMAINS.map(({ icon, name }) => (
                                        <button
                                            type="button"
                                            key={name}
                                            name="domain"
                                            value={name}
                                            className={`flex shrink-0 whitespace-nowrap !items-start !justify-start gap-2 !px-3 !py-1 !rounded-full text-[14px] text-slate-800 bg-white/90 ring hover:scale-98 hover:bg-slate-100 hover:ring hover:ring-amber-500 transition-all duration-200 border ${form.domain === name ? "font-medium border-indigo-700 scale-102" : "!font-normal  border-white/50"}`}
                                            onClick={(e) => {
                                                setShowTopicMenu(false);
                                                handleChange(e);
                                            }}
                                        >
                                            {form.domain === name && (
                                                <div className="absolute size-2 bg-emerald-400/90 top-0 right-0 rounded-full"></div>
                                            )}
                                            {icon}
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tags */}

                        <div className="flex flex-col space-y-1">
                            <div className="space-y-1">
                                <p
                                    className={`text-sm font-medium ml-1 ${error.tags ? "text-rose-500 animate-error-pop" : ""} flex gap-1 items-center`}
                                >
                                    Tags <span>{form.tags.length} / 5</span>
                                    {error.tags && <ExclamationCircle />}
                                </p>
                                <p className="text-slate-500 text-sm ml-1">
                                    Selecting tags will help improve your clans
                                    discoverability
                                </p>

                                <div
                                    onClick={() => inputRef.current.focus()}
                                    className="flex items-center rounded-3xl border border-white/90 bg-white/70 px-3 py-2 min-h-12 focus-within:ring-2 focus-within:ring-indigo-500 space-x-2 overflow-x-auto no-scrollbar py-1"
                                >
                                    {form.tags.map((tag) => (
                                        <div
                                            key={tag}
                                            className={`flex shrink-0 whitespace-nowrap !items-center !justify-center gap-2 !px-3 !py-1 !rounded-full text-[14px] text-slate-800 bg-indigo-100`}
                                        >
                                            <button
                                                type="button"
                                                className="!p-2 flex items-center justify-center h-3 w-3 !rounded-full"
                                                onClick={() =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        tags: prev.tags.filter(
                                                            (item) =>
                                                                item !== tag
                                                        ),
                                                    }))
                                                }
                                            >
                                                ✕
                                            </button>
                                            {tag}
                                        </div>
                                    ))}
                                    {form.tags.length < 5 && (
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            className={`flex-1 min-w-[240px] bg-transparent outline-none text-sm placeholder:text-slate-400`}
                                            placeholder="Add up to 5 tags..."
                                            value={tagInput}
                                            onChange={(e) =>
                                                setTagInput(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Visibility */}
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium ml-1">
                                Visibility
                            </p>
                            <div className="flex w-full space-x-2">
                                {visibility.map((option) => (
                                    <div
                                        className={`rounded-xl w-full flex items-center cursor-pointer transition-all duration-300 p-4 bg-white/30 backdrop-blur-2xl border hover:ring-2 hover:ring-amber-500 text-sm ${form.visibility === option.name ? "ring-2 ring-blue-700/30 border-indigo-500 text-slate-900" : "border-white/50 text-slate-500"}`}
                                        onClick={() => {
                                            setForm((prev) => ({
                                                ...prev,
                                                visibility: option.name,
                                            }));
                                        }}
                                    >
                                        <div className="flex gap-1 items-end">
                                            {option.icon}
                                            <p className=" font-medium">
                                                {option.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-slate-700 text-sm ml-1">
                                {form.visibility === "Public"
                                    ? "Your clan will be publicly visibile, and anyone can join."
                                    : "Users have to request permission to join your clan."}
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="px-2">
                        <button
                            type="submit"
                            disabled={creatingClan}
                            className={`w-full h-14 !rounded-2xl flex items-center justify-center text-slate-100 font-medium transition duration-300 ${creatingClan ? "bg-indigo-500 cursor-not-allowed" : "bg-gradient-to-br from-blue-600 to-indigo-500 hover:shadow-lg hover:scale-99 active:scale-100 "}`}
                        >
                            {creatingClan ? (
                                <div className="flex items-center space-x-2">
                                    <div className="h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />
                                    <p> Creating clan...</p>
                                </div>
                            ) : (
                                "Create Clan"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
