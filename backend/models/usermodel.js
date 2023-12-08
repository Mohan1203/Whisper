const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const errorHandler = require("../utils/errorHandler")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'Username already exists'],
        lowercase: true
    },
    profilepic: {
        type: String
    },
    // profilepicURL: {
    //     type: String
    // },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        lowercase: true
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    token: String,
    tokenExpiry: Date,

}, { timestamp: true })



//Pre method for hash password during a save a documents
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

userSchema.post('save', async function (err, doc, next) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new errorHandler('Email and Username must be unique', 400))
    }
})

// Schemas compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Method for generate token while user login in his account
userSchema.methods.generateToken = async function () {
    const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY, { expiresIn: '12h' })
    this.token = token;
    this.tokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
    await this.save()
    return token;
}



const user = new mongoose.model("User", userSchema)


module.exports = user