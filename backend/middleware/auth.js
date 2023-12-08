const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/usermodel');
const catchasync = require('../utils/catchAsync');

const auth = catchasync(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new errorHandler("UnAuthorized", 401));
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(user._id);
    if (req.user.tokenExpiry < Date.now()) {
        return next(new errorHandler("The JWT token is invalid"))
    }
    return next();

})

module.exports = auth;