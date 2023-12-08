const { sendMessage, fetchMessages } = require("../controller/messageController")
const auth = require("../middleware/auth")

const router = require("express").Router()

router.route("/sendmessage").post(auth, sendMessage)
router.route("/fetchMessages/:chatId").get(auth, fetchMessages)

module.exports = router