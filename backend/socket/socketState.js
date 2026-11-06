export const onlineUsers = new Map();
export const activeChats = new Map();

export const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};

export const isUserViewingChat = (userId, chatId) => {
    return activeChats.get(userId)?.toString() === chatId.toString();
};
