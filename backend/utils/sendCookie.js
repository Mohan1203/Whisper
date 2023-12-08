const sendCookie = async (user = {}, statusCode, res) => {
    const token = await user.generateToken()
    const options = {
        expires: new Date(60 * 60 * 12),
        httpOnly: true,
    };
    return res.status(statusCode).cookie('token', token, options).json(
        {
            success: true,
            token: user.token,
            user: {
                name: user.userName,
                id: user._id,
            }
        }
    )

}

module.exports = sendCookie;