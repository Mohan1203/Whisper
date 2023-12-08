const { registerUser, loginUser, logout, searchUser, getUserProfile } = require("../controller/usercontroller")
const auth = require("../middleware/auth")
const upload = require("../middleware/multer")

const router = require("express").Router()


router.route("/registeruser").post(upload.single("profilepic"), registerUser)
router.route("/loginuser").post(loginUser)
router.route("/getuserprofile/:id").get(auth, getUserProfile)
router.route("/searchuser").get(auth, searchUser)
router.route("/logout").get(auth, logout)
// router.route("/getuser").get(auth, getUser)
module.exports = router
