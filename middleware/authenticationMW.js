const User = require('../models/user')
const { Unauthenticated } = require("../errors")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new Unauthenticated("Authentication Invalid, Please provide valid token")
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes
        req.user = { userID: payload.userID, name: payload.name }
        next()
    }
    catch (error) {
        throw new Unauthenticated("Authentication Invalid")
    }
}

module.exports = auth