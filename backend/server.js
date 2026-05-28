import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import accessRoutes from "./routes/accessRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(cookieParser());
app.use("/api/auth", accessRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

const server = http.createServer(app);

export const io = new Server(server, {
    cors: { origin: "*" },
    pingInterval: 25000,
    pingTimeout: 60000,
});

const onlineUsers = new Map();
const activeChats = new Map();

// Middleware for logging
io.use((socket, next) => {
    socket.connectedAt = Date.now();
    next();
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
        socket.userId = userId;

        socket.join(userId);

        if (!onlineUsers.has(userId)) {
            onlineUsers.set(userId, new Set());
        }

        onlineUsers.get(userId).add(socket.id);

        io.emit("presence_update", {
            userId,
            isOnline: true,
        });

        console.log("ONLINE USERS", [...onlineUsers.entries()]);
        console.log(`Socket joined room: ${userId}`);
    });

    // New event: send list of currently online users
    socket.on("get_online_users", () => {
        const onlineUserIds = Array.from(onlineUsers.keys());
        socket.emit("online_users_list", onlineUserIds);
    });

    socket.on("join_chat", (chatId) => {
        socket.join(chatId);
        console.log(`Socket joined chat: ${chatId}`);
    });

    socket.on("leave_chat", (chatId) => {
        socket.leave(chatId);
        console.log(`Socket left chat: ${chatId}`);
    });

    socket.on("chat_opened", ({ userId, chatId }) => {
        activeChats.set(userId, chatId);
    });

    socket.on("chat_closed", ({ userId }) => {
        activeChats.delete(userId);
    });

    socket.on("disconnect", () => {
        const userId = socket.userId;

        if (!userId) return;

        const userSockets = onlineUsers.get(userId);

        if (userSockets) {
            userSockets.delete(socket.id);

            if (userSockets.size === 0) {
                onlineUsers.delete(userId);

                activeChats.delete(userId);

                io.emit("presence_update", {
                    userId,
                    isOnline: false,
                });
            }
        }
        console.log(`Socket disconnected: ${socket.id}`);
    });

    // Error handling
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});

export const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};

export const isUserViewingChat = (userId, chatId) => {
    return activeChats.get(userId)?.toString() === chatId.toString();
};

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("🚀 App connected to mongoDB");
        server.listen(port, () => {
            console.log(`🔌 App live at ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
