const User = require("../models/usermodel")
const errorHandler = require("../utils/errorHandler")
const catchAsync = require("../utils/catchAsync")
const sendCookie = require("../utils/sendCookie")


exports.registerUser = catchAsync(async (req, res, next) => {
    const { userName, email, password } = req.body;
    const profilepic = req.file;

    if (!userName || !email || !password) {
        next(new errorHandler('All fieldes are requires', 400))
    }

    const newUser = new User({
        email: email,
        userName: userName,
        password: password,
        profilepic: profilepic.originalname,

    })
    const savedUser = await newUser.save()
    res.json({ message: 'User Saved succesfully', status: 200 })

})

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new errorHandler("Credentials are missing", 404))
    }
    const user = await User.findOne({ email: email })
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new errorHandler("Credentials are not match", 400))
    }
    sendCookie(user, 201, res)

})


exports.searchUser = catchAsync(async (req, res, next) => {
    const searchKeyword = req.query.search
    const searchRegex = new RegExp(searchKeyword, "i")
    const user = await User.find({ $or: [{ userName: searchRegex }, { email: searchRegex }] }).find({ _id: { $ne: req.user._id } }).select("-password -token -tokenExpiry").exec()
    return res.status(200).send({ user })
})

exports.getUserProfile = catchAsync(async (req, res, next) => {
    const userId = req.params.id
    if (!userId) {
        return next(new errorHandler("User not found", 404))
    }
    const user = await User.findById(userId).select("-password -token -tokenExpiry").exec()
    return res.status(200).send({ user })
})

exports.logout = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    user.token = ""
    user.tokenExpiry = ""
    res.clearCookie("token")
    await user.save()
    return res.json({ message: "Logout successfull", status: 200 })
})