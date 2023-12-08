const app = require("./app")
const dotenv = require("dotenv")
const http = require("http")
const { Server } = require("socket.io")
require('dotenv').config()
const connection = require("./config/db_connection")

connection()

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

app.get("/", (req, res) => {
    res.send("API is running")
})

io.on("connection", (socket) => {
    socket.on('setup', (roomid) => {
        socket.join(roomid)
        socket.emit('connected')
    })

    socket.on('join room', (roomid) => {
        socket.join(roomid)
    })

    socket.on('typing', (room) => {
        socket.in(room).emit('typing')
    })
    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing')
    })

    socket.on('send message', (message) => {
        const chat = message.chatId
        if (!chat) return console.log("no user")

        chat.users.forEach((user) => {
            if (user._id === message.sender._id) return
            socket.in(user._id).emit('new message', message)
        })

    })
    socket.off('setup', () => {
        console.log("disconnected")
        socket.leave(roomid)
    })
})

httpServer.listen(3333, () => {
    console.log("server is running on port 3333")
})

