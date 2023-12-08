const Message = require("../models/messageModel")
const catchAsync = require("../utils/catchAsync")
const errorHandler = require("../utils/errorHandler")
const User = require("../models/usermodel")
const Chat = require("../models/chatmodel")
const mongoose = require("mongoose")

exports.sendMessage = catchAsync(async (req, res, next) => {
    let { chatId, content } = req.body;
    const sender = req.user._id;

    if (!chatId || !content) {
        return next(new errorHandler("ReceiverId or content are missing", 404))
    }

    const newMessage = {
        sender: sender,
        chatId: chatId,
        content: content
    }
    let lastSendedMessage = await Message.create(newMessage)
    lastSendedMessage = await lastSendedMessage.populate("sender", "userName email profilepic")
    lastSendedMessage = await lastSendedMessage.populate('chatId')
    lastSendedMessage = await User.populate(lastSendedMessage, { path: "chatId.users", select: "userName email profilepic" })
    const chat = await Chat.findByIdAndUpdate(chatId, { latestMessage: lastSendedMessage._id }, { new: true })


    return res.status(200).send(lastSendedMessage)

})

exports.fetchMessages = catchAsync(async (req, res, next) => {
    const { chatId } = req.params;
    if (!chatId) {
        return next(new errorHandler("ChatId is missing", 404))
    }
    let messages = await Message.find({ chatId: chatId }).populate("sender", "userName email profilepic").sort({ createdAt: -1 }).populate("chatId")
    messages = await User.populate(messages, { path: "chatId.users", select: "userName email profilepic" })

    return res.status(200).send(messages)
})