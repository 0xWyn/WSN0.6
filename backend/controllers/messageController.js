import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";
import { createNotification } from "../services/notificationService.js";
import { io } from "../server.js";

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

        const newMessage = await Message.create({
            sender,
            receiver,
            chat: chatId,
            text,
            media,
        });

        chat.lastMessage = newMessage._id;

        chat.unreadCounts[userId] = (chat.unreadCounts[userId] || 0) + 1;

        await chat.save();

        console.log(chat);
        io.to(chatId.toString()).emit("new_message", newMessage);

        io.to(receiver.toString()).emit("chat_updated", {
            chatId,
            unreadCount: currentUnread + 1,
        });

        return res.status(201).json(newMessage);
    } catch (error) {
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
