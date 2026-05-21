import { createChat } from "../api/chatApis";

export const resolveChat = async (targetId) => {
    const { data } = await createChat(targetId);

    return data;
};
