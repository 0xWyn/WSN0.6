import { useParams } from "react-router-dom";
import { PaperPlane } from "../../../../components/icons/paper-airplane";
import Plus from "../../../../components/icons/plus";
import { useMessaging } from "../../hooks/useMessaging";
import { Preview } from "./Previews";
import { useEffect, useRef, useState } from "react";

export default function MInput({ messaging }) {
    const [inputError, setInputError] = useState("");
    const {
        textInputRef,
        fileInputRef,
        text,
        media,
        sending,
        removeMedia,
        handleChange,
        handleMediaSelect,
        handleSendMessage,
        editingMessage,
        cancelEditing,
    } = messaging;

    const timeoutRef = useRef(null);
    const showError = (error) => {
        setInputError(error);

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setInputError("");
        }, 4000);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <div className="flex flex-col items-center w-full justify-center absolute bottom-0 px-8 lg:px-4 max-w-4xl my-2 ">
            {editingMessage && (
                <div className="flex items-center justify-between rounded-xl bg-blue-500/10 px-3 py-2">
                    <div>
                        <p className="text-xs text-slate-500">
                            Editing message
                        </p>

                        <p className="truncate text-sm">
                            {editingMessage.text}
                        </p>
                    </div>

                    <button onClick={cancelEditing}>Cancel</button>
                </div>
            )}
            {sending && <div>Sending...</div>}
            <div className="w-full rounded-3xl border border-slate-200/70 bg-white/75 px-[8px] py-[1px] backdrop-blur-xl shadow-2xl shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                {media.length > 0 && (
                    <Preview files={media} handleRemove={removeMedia} />
                )}
                <div className="flex items-center gap-3 px-2 py-1">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center text-slate-600 !p-0 size-10 
                        shrink-0 !rounded-full hover:border border-slate-400/20 active:bg-blue-400 active:text-white transition-all duration-300"
                    >
                        <Plus />
                    </button>
                    <input
                        ref={fileInputRef}
                        multiple
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            const files = [...e.target.files];

                            if (!files.length) return;

                            if (media.length >= 3) {
                                showError(
                                    "You have selected the allowed number of media"
                                );
                                e.target.value = "";
                                return;
                            }

                            let remainingSlots = 3 - media.length;

                            let selected = files;

                            if (files.length > remainingSlots) {
                                showError(
                                    `You can only select ${remainingSlots} files`
                                );

                                selected = files.slice(0, remainingSlots);
                            }

                            handleMediaSelect(selected);

                            e.target.value = "";
                        }}
                    />

                    <textarea
                        ref={textInputRef}
                        value={text}
                        rows={1}
                        placeholder="Message..."
                        className="max-h-[10.5rem] min-h-[2.75rem] resize-none flex-1 bg-transparent text-sm text-black leading-6 placeholder:text-slate-400 placeholder:transition-opacity focus:placeholder:opacity-60 outline-none overflow-y-auto p-3 [scrollbar-width:none]"
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                        }}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="!rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-600 size-9 flex items-center justify-center !p-0 text-sm text-slate-200 shadow-sm hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 active:bg-gradient-to-br active:from-sky-500 active:to-blue-500 transition duration-300"
                    >
                        <PaperPlane />
                    </button>
                </div>
                {inputError.trim() && (
                    <div className="w-full px-[16px] py-[16px]">
                        <p className="text-slate-800/50 text-xs tracking-wide">
                            {inputError}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
