const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../errors")

const errorHandlerMW = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again later'
    }
    
    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({message: err.message})
    // }
 
    if(err.name === 'ValidationError'){
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = Object.values(err.errors).map(item => item.message).join(', ')   
        // console.log(err)
        // here err.errors is an list of bojects, each object contains error message, so we are extracting error message from each object and joining them with ', ' (we see this obj in console.log(err) in terminal) 
    }

    if(err.name === 'CastError'){
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = `No job with this ID: ${err.value}`
    }

    if(err.code || err.code === 11000){
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({message: customError.message})
}

module.exports = errorHandlerMW