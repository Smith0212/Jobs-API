const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        "Please provide valid email"
        ],
        unique: true,  //it will throw duplicate key error
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
})
  
//schema level middleware
UserSchema.pre("save", async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

// instance methods
UserSchema.methods.createJWT = function () {
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: "30d"})
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcryptjs.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)