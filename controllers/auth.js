const User = require("../models/user")
const { StatusCodes } = require("http-status-codes")
const { BadRequest, Unauthenticated } = require("../errors") 


const register = async(req, res) => {
    const user = await User.create(req.body)
    const token = user.createJWT()  // here we are using instence(for creating token) method of user model

    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token })  //here data is sent according to frontend convenience(in frontend we can access data in this structure)
}

const login = async(req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        throw new BadRequest("Please provide email and password")
    }
    
    //check user exist or not 
    const user = await User.findOne({email})
    if(!user){
        throw new Unauthenticated("Invalid Credentials")
    }

    //if user exist than compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new Unauthenticated("Invalid Credentials")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
    register,
    login,
}