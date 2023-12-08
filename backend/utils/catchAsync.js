module.exports = (errfunc) =>
    (req, res, next) => {
        errfunc(req, res, next).catch(err => {
            console.log(err)
            next(err)
        })
    }

