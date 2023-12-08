const mongoose = require("mongoose")
const errorHandler = require("../utils/errorHandler")



const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connect")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection