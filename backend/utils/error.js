module.exports = (error, req, res, next) => {
    error.message = error.message || "error";
    error.statusCode = error.statuscode || 500;

    res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message
    })
}