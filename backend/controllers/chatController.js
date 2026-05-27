import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import { io } from "../server.js";

export const createChat = async (req, res) => {
    try {
        const user = req.user;

        const { targetId } = req.params;

        const existingChat = await Chat.findOne({
            participants: { $all: [user._id, targetId], $size: 2 },
        }).populate("participants", "username avatar");

        if (existingChat) {
            const receiver = existingChat.participants.find(
                (participant) => !participant._id.equals(user._id)
            );
            const result = { ...existingChat.toObject(), receiver };
            return res.status(200).json(result);
        }

        let newChat = await Chat.create({
            participants: [user._id, targetId],
            lastMessage: null,
        });

        newChat = await newChat.populate("participants", "username avatar");

        const receiver = newChat.participants.find(
            (participant) => !participant._id.equals(user._id)
        );

        const result = { ...newChat.toObject(), receiver };

        return res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const fetchChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({ participants: userId })
            .populate("participants", "username avatar")
            .populate("lastMessage");

        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const fetchChatById = async (req, res) => {
    try {
        const { chatId } = req.params;

        const userId = req.user._id;

        const chat = await Chat.findById(chatId).populate(
            "participants",
            "username avatar"
        );

        if (!chat) return res.status(404).json({ msg: "Chat not found" });

        if (
            !chat.participants.find((participant) =>
                participant._id.equals(userId)
            )
        )
            return res.status(403).json({ msg: "Forbidden" });

        const receiver = chat.participants.find(
            (participant) => !participant._id.equals(userId)
        );

        const result = { ...chat.toObject(), receiver };

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const useConversation = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.find({ chat: chatId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const markChatRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.params;

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ msg: "Chat not found" });
        chat.unreadCounts.set(userId.toString(), 0);

        await chat.save();

        io.to(userId.toString()).emit("chat_unread_update", {
            chatId,
            userId,
            unreadCount: 0,
        });

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};
