import { Server } from "socket.io";

export const useIO = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`Socket joined room: ${userId}`);
        });

        socket.on("join_chat", (chatId) => {
            socket.join(chatId);
            console.log(`Socket joined chat: ${chatId}`);
        });

        socket.on("leave_chat", (chatId) => {
            socket.leave(chatId);
            console.log(`Socket left chat: ${chatId}`);
        });

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return { io };
};
