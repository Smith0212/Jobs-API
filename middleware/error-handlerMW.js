const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../errors")

const errorHandlerMW = (err, req, res, next) => {
    
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
}

module.exports = errorHandlerMW