const Chat = require('../models/chatmodel')
const catchAsync = require("../utils/catchAsync")
const errorHandler = require('../utils/errorHandler')
const User = require('../models/usermodel')


exports.createChat = catchAsync(async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return next(new errorHandler("User id is required", 400))
    }

    if (userId === req.user._id.toString()) {
        return next(new errorHandler("You can't send message to yourself", 400))
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: req.user._id } } }
        ],
    }).populate("users").
        populate("latestMessage").exec()

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "userName"
    })

    if (isChat.length > 0) {
        return res.status(200).send({ chat: isChat[0] })
    }
    const newChat = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId]
    }

    try {
        const chat = await Chat.create(newChat)
        const fullChat = await Chat.findOne({ _id: chat._id }).populate("users", "-password")
        return res.status(200).send({ fullChat })
    } catch (err) {
        return next(new errorHandler(err.message, 400))
    }
})

exports.fetchChats = catchAsync(async (req, res, next) => {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users").populate("latestMessage").sort({ updatedAt: -1 }).exec()

    const fullChats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "userName"
    })
    return res.status(200).send({ fullChats })
})

exports.createGroupChat = catchAsync(async (req, res, next) => {
    const { chatName, users, description } = req.body;
    if (!chatName || !users) {
        return next(new errorHandler("Chat name and users are required", 400))
    }

    if (users.length < 2) {
        return next(new errorHandler("Group chat have atleat 2 members", 400))
    }
    users.push(req.user._id)

    const newChat = await Chat.create({
        chatName,
        isGroupChat: true,
        users,
        groupAdmin: req.user._id,
        description: description || " "
    })

    const fullChat = await Chat.findOne({ _id: newChat._id }).populate("users", '-password -token -tokenExpiry').populate("latestMessage").populate("groupAdmin", "-password -token -tokenExpiry").exec()
    return res.status(200).send({ fullChat })

})

exports.renameGroupChat = catchAsync(async (req, res, next) => {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
        return next(new errorHandler("Chat id and chat name is required", 400))
    }
    console.log(chatId)
    const chat = await Chat.findByIdAndUpdate({ _id: chatId, groupAdmin: req.user._id }, { chatName }, { new: true }).populate("users", "-password -token -tokenExpiry").populate("latestMessage").populate("groupAdmin", "-password -token -tokenExpiry").exec()
    if (!chat) {
        return next(new errorHandler("Only admin can change the group name", 400)``)
    }



    return res.status(200).send({ chat })

})

exports.addMemberInGroup = catchAsync(async (req, res, next) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({ _id: chatId, groupAdmin: req.user._id })

    if (chat.users.includes(userId)) {
        return next(new errorHandler("User already in group ", 400))
    }

    chat.users.push(userId)
    const savedChat = await chat.save()

    const fullChat = await Chat.findOne({ _id: savedChat }).populate("users", "-password -token -tokenExpiry").populate("latestMessage").populate("groupAdmin", "-password -token -tokenExpiry")

    return res.status(200).send(fullChat)

})

exports.removeMemberFromGroup = catchAsync(async (req, res, next) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({ _id: chatId, groupAdmin: req.user._id })

    if (!chat.users.includes(userId)) {
        return next(new errorHandler("You can't remove user which is not in group", 400))
    }

    chat.users.pull(userId)
    const savedChat = await chat.save()

    const fullChat = await Chat.findOne({ _id: savedChat }).populate("users", "-password -token -tokenExpiry").populate("latestMessage")

    return res.status(200).send(fullChat)

})



