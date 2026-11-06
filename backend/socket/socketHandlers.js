import { feedTypes } from "../config/feedTypes.js";
import Chat from "../models/chatModel.js";
import ClanMember from "../models/clanMemberModel.js";
import Clan from "../models/clanModel.js";
import { canAccessFeed } from "./feedAccess.js";
import { activeChats, onlineUsers } from "./socketState.js";

export const registerSocketHandlers = (io, socket) => {
    const userId = socket.userId;

    socket.join(userId);

    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
    }

    const userSockets = onlineUsers.get(userId);
    const wasOffline = userSockets.size === 0;

    userSockets.add(socket.id);

    if (wasOffline) {
        io.emit("presence_update", {
            userId,
            isOnline: true,
        });
    }

    console.log("ONLINE USERS", [...onlineUsers.entries()]);
    console.log(`Socket joined room: ${userId}`);

    socket.on("join_clan", async (clanId) => {
        try {
            const clan = await Clan.findById(clanId).select("access");

            if (!clan) return;

            if (clan.access === "private") {
                const membership = await ClanMember.findOne({
                    clan: clanId,
                    user: userId,
                    status: "active",
                });

                if (!membership) return;
            }
            socket.join(`clan:${clanId}`);
            console.log(`Socket joined clan: ${clanId}`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("leave_clan", (clanId) => {
        socket.leave(`clan:${clanId}`);
        console.log(`Socket left clan: ${clanId}`);
    });

    socket.on("join_feed", async ({ type, id }, callback) => {
        try {
            if (!feedTypes.includes(type)) return callback?.({ ok: false });

            const allowed = await canAccessFeed(userId, type, id);

            if (!allowed) return callback?.({ ok: false });

            const room = `feed:${type}:${id}`;

            await socket.join(room);

            callback?.({ ok: trye });
        } catch (error) {
            console.error("Feed subscription error:", error);
            callback?.({ ok: false });
        }
    });

    socket.on("leave_feed", ({ type, id }) => {
        if (!feedTypes.includes(type)) return;

        socket.leave(`feed:${type}:${id}`);
    });

    // New event: send list of currently online users
    socket.on("get_online_users", () => {
        const onlineUserIds = Array.from(onlineUsers.keys());
        socket.emit("online_users_list", onlineUserIds);
    });

    socket.on("join_chat", async (chatId) => {
        try {
            const chat = await Chat.findOne({
                _id: chatId,
                participants: userId,
            });

            if (!chat) return;

            socket.join(`chat:${chatId}`);
            console.log(`Socket joined chat: ${chatId}`);
        } catch (error) {}
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
        const userSockets = onlineUsers.get(userId);

        if (!userSockets) return;

        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
            onlineUsers.delete(userId);
            activeChats.delete(userId);

            io.emit("presence_update", {
                userId,
                isOnline: false,
            });
        }

        console.log(`Socket disconnected: ${socket.id}`);
    });

    // Error handling
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
};
