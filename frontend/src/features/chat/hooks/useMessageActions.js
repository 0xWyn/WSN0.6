import { createMessage, deleteMessage } from "../api/messageApis.js";
import { uploadToCloudinary } from "../../../utils/uploadToCloud.js";
import { uploadAllFiles } from "../../../utils/uploadToCloud.js";

export const useMessageActions = () => {
    const sendMessage = async (data) => {
        const media = await uploadAllFiles(data.media, {
            folder: "messages",
        });
        const payload = { ...data, media };
        const res = await createMessage(payload);
        console.log(res.data);
    };

    const removeMessage = async (id) => {
        const { data } = await deleteMessage(id);
        console.log(data);
    };

    const editMessage = async ({ id, text, media }) => {
        const existingMedia = media.filter((m) => m.existing);
        const newFiles = media.filter((m) => !m.existing).map((m) => m.file);
        const uploadedMedia = await uploadAllFiles(newFiles, {
            folder: "messages",
        });
        const payload = {
            text,
            media: [...existingMedia, ...uploadedMedia],
        };
        const { data } = await patchMessage(id, payload);
        return data;
    };

    return { sendMessage, removeMessage, editMessage };
};
