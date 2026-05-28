import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import { createNotification } from "../services/notificationService.js";
import { io } from "../server.js";
import { isUserViewingChat } from "../server.js";

export const createMessage = async (req, res) => {
    try {
        const sender = req.user._id;

        const { chat: chatId, text, media } = req.body;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ msg: "Chat not found" });
        }

        const receiver = chat.participants.find(
            (participant) => participant.toString() !== sender.toString()
        );

        const newMessage = new Message({
            sender,
            receiver,
            chat: chatId,
            text,
            media,
        });

        chat.lastMessage = newMessage._id;

        const receiverId = receiver.toString();

        const isChatting = isUserViewingChat(receiverId, chatId);

        if (!isChatting) {
            chat.unreadCounts.set(
                receiverId,
                (chat.unreadCounts.get(receiverId) || 0) + 1
            );
        }

        await chat.save();
        await newMessage.save();

        if (!isChatting) {
            io.to(receiverId).emit("chat_unread_update", {
                chatId,
                userId: receiverId,
                unreadCount: chat.unreadCounts.get(receiverId),
            });
        }

        io.to(chatId).emit("new_message", newMessage);

        const updatedChat = await Chat.findById(chatId).populate("lastMessage");
        io.emit("chat_lastMessage_update", {
            chatId,
            lastMessage: updatedChat.lastMessage,
            updatedAt: updatedChat.updatedAt,
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Failed to create message" });
    }
};
export const getMessage = () => {};

export const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message)
            return res.status(404).json({ error: "Message not found" });
        if (message.sender.toString() !== req.user._id.toString())
            return res.status(403).json({ error: "Forbidden" });
        const chatId = message.chat;
        const chat = await Chat.findById(chatId);

        await message.deleteOne();

        const latestMessage = await Message.findOne({ chat: chatId }).sort({
            createdAt: -1,
        });

        chat.lastMessage = latestMessage?._id || null;

        io.to(chatId.toString()).emit("deleted_message", message);

        await chat.save();

        return res.status(200).json({ msg: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const editMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message)
            return res.status(404).json({
                msg: "Message not found",
            });
        if (message.sender.toString() !== req.user._id.toString())
            return res.status(403).json({
                msg: "Unauthorised",
            });
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.messageId,
            {
                $set: {
                    text: req.body.text,
                    media: req.body.media,
                    edited: true,
                },
            },
            { returnDocument: after }
        );

        io.to(message.chat.toString()).emit("edited_message", updatedMessage);
        return res.status(200).json("Message updated");
    } catch (error) {
        return res.status(500).json({ error });
    }
};
