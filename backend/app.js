const express = require("express")
const cookie_parser = require("cookie-parser")
const cors = require('cors')
const path = require("path")

const errorMiddleware = require("./utils/error")

const chatRouter = require("./router/chatRouter")
const userRouter = require("./router/userRouter")
const messageRouter = require("./router/messageRouter")

const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}


app.use(express.json())
app.use(cors(corsOptions))
app.use(cookie_parser())
app.use(express.static('media/profilepic'))

app.use("/api/v1", userRouter)
app.use("/api/v1", chatRouter)
app.use("/api/v1", messageRouter)

app.use(errorMiddleware)

module.exports = app