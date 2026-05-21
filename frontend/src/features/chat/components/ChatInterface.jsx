import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthProvider";
import LocNav from "../../../components/ui/LocNav";
import Avatar from "../../user/components/Avatar";
import { useChatting } from "../hooks/useChatting";
import InputBar from "./InputBar";
import MessageContainer from "./MessageContainer";
import ErrorState from "../../../components/ui/ErrorState";
import FullscreenLoader from "../../../components/ui/FullscreenLoader";

export default function ChatInterface() {
    const { id } = useParams();
    const { user } = useAuth();
    const { chat, messages, loading } = useChatting(id);
    const [thread, setThread] = useState([]);
    const [draft, setDraft] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (messages) {
            setThread(messages);
        }
    }, [messages]);

    const receiver =
        chat?.receiver ||
        chat?.participants?.find(
            (participant) => participant?._id !== user?._id
        ) ||
        chat?.members?.find((member) => member?._id !== user?._id) ||
        {};

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setAttachment(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSend = (event) => {
        event.preventDefault();
        if (!draft.trim() && !attachment) return;

        const newMessage = {
            _id: `local-${Date.now()}`,
            text: draft.trim(),
            sender: user,
            media: attachment
                ? {
                      type: attachment.type.startsWith("video")
                          ? "video"
                          : "image",
                      url: previewUrl,
                  }
                : null,
            createdAt: new Date().toISOString(),
        };

        setThread((prev) => [...prev, newMessage]);
        setDraft("");
        setAttachment(null);
        setPreviewUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (loading)
        return (
            <div className="flex h-full w-full items-center justify-center">
                <FullscreenLoader />
            </div>
        );

    if (!chat && !loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <ErrorState />
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-4 rounded-xl bg-slate-100 p-4 border">
            <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
                {/* <aside className="hidden flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm lg:flex border">
                    <div className="flex items-center gap-3">
                        <Avatar user={receiver} size={16} />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {receiver?.username || "Unknown user"}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                                {chat?.title || "Private conversation"}
                            </p>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
                        <p className="font-semibold text-slate-900">
                            Conversation details
                        </p>
                        <p className="mt-2 leading-6">
                            Tap into a polished messaging experience with
                            responsive bubbles, file previews, and a compact
                            conversation summary.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">Status</p>
                        <p className="mt-2 text-slate-500">
                            {receiver?.isOnline ? "Online now" : "Offline"}
                        </p>
                    </div>
                </aside> */}

                <main className="flex min-h-0 flex-col rounded-3xl bg-white shadow-sm w-full">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Avatar user={receiver} size={14} />
                            <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-slate-900">
                                    {receiver?.username || "Chat"}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {receiver?.isOnline
                                        ? "Online"
                                        : "Last seen recently"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-200">
                                Info
                            </button>
                            <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-200">
                                Mute
                            </button>
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
                        <MessageContainer thread={thread} />
                    </div>

                    <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                        <InputBar
                            message={draft}
                            setMessage={setDraft}
                            onSubmit={handleSend}
                            fileInputRef={fileInputRef}
                            onFileChange={handleFileChange}
                            media={attachment}
                            previewUrl={previewUrl}
                            fileType={
                                attachment?.type?.startsWith("video")
                                    ? "video"
                                    : "image"
                            }
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
