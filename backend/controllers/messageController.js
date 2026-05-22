import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";

export const createMessage = async (req, res) => {
    try {
        const user = req.user._id;
        const { chat, text, media } = req.body;
        const sourceChat = await Chat.findById(chat);
        if (!sourceChat) return res.status(404).json("Chat not found");
        const receiver = sourceChat.participants.find(
            (participant) => participant.toString() !== user.toString()
        );
        const newMessage = await Message.create({
            sender: user,
            receiver,
            chat,
            text,
            media,
        });
        sourceChat.lastMessage = newMessage._id;
        await sourceChat.save();
        return res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export const getMessage = () => {};

export const deleteMessage = async (req, res) => {
 try {
    const {messageId } = req.params;
    const user = req.user;
    const message = Message.findById(messageId);
    if (!message.sender === user._id.toString()) return res.status(402).json({error: "Failed to authenticate req.user"})
        const chatId = message.chat;
    const chat = Chat.findById(chatId);
const conversation = Message.find({chat: chatId}).sort({createdAt: -1});
if (chat.lastMessage.toString() === messageId) {
    conversation.map((message, index) => {
        if (!conversation[index + 1]) {
            chat.lastMessage = message;
            return;
        }
        return message;
    })
};
await message.delete();
return res.status(200).json({msg: "Message deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error})
    }
};

export const editMessage = () => {
};
