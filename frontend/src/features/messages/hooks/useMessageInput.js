// hook for handling message state and input
import { useMessageActions } from "../../messages/hooks/useMessageActions";
import { useEffect, useRef, useState } from "react";

export const useMessageInput = (id) => {
    const [text, setText] = useState("");
    const [media, setMedia] = useState([]);
    const [sending, setSending] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);

    const textInputRef = useRef(null);

    const fileInputRef = useRef(null);

    const { sendMessage, editMessage } = useMessageActions();

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

            if (editingMessage) {
                await editMessage({ id: editingMessage._id, text, media });

                cancelEditing();

                return;
            }
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

    const startEditing = (message) => {
        setEditingMessage(message);
        setText(message.text || []);
        setMedia(
            (message.media || []).map((item) => ({ ...item, existing: true }))
        );
        textInputRef.current?.focus();
    };

    const cancelEditing = () => {
        setEditingMessage(null);
        resetMessage();
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

        editingMessage,
        startEditing,
        cancelEditing,
    };
};
