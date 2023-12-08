const express = require('express');
const router = express.Router();
const { createChat, fetchChats, createGroupChat, renameGroupChat, addMemberInGroup, removeMemberFromGroup } = require("../controller/chatcontroller")
const auth = require('../middleware/auth')

router.route('/createChat').post(auth, createChat)
router.route("/fetchChats").get(auth, fetchChats)
router.route("/creategroup").post(auth, createGroupChat)
router.route("/renamegroup").put(auth, renameGroupChat)
router.route("/addmemberingroupchat").put(auth, addMemberInGroup)
router.route("/removememberfromgroup").put(auth, removeMemberFromGroup)

module.exports = router;