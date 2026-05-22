import { createMessage } from "../api/messageApis.js";
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

    return { sendMessage };
};
