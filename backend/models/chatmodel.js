const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    chatImage: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true })

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat