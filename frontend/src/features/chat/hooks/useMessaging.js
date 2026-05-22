// hook for handling message state and input
import { useMessageActions } from "./useMessageActions";
import { useEffect, useRef, useState } from "react";

export const useMessaging = (id) => {
    const [text, setText] = useState("");
    const [media, setMedia] = useState([]);
    const [sending, setSending] = useState(false);

    const textInputRef = useRef(null);

    const fileInputRef = useRef(null);

    const { sendMessage } = useMessageActions();

    const handleMediaSelect = (files) => {
        const formatted = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith("video") ? "video" : "image",
        }));

        setMedia((prev) => [...prev, ...formatted]);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setText(value);
    };

    const removeMedia = (index) => {
        setMedia((prev) => prev.filter((_, i) => i !== index));
    };

    const resetMessage = () => {
        setText("");
        setMedia([]);

        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    const handleSendMessage = async () => {
        const trimmed = text.trim();

        if (!trimmed && media.length === 0) return;

        try {
            setSending(true);
            const files = media.map((item) => item.file);
            const data = {
                chat: id,
                text,
                media: files,
            };
            const res = await sendMessage(data);

            resetMessage();
        } catch (error) {
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    return {
        textInputRef,
        fileInputRef,

        text,
        setText,

        sending,

        media,
        setMedia,
        removeMedia,

        handleChange,
        handleMediaSelect,
        handleSendMessage,
    };
};
