const CustomAPIError = require("./customAPIError");
const { StatusCodes } = require("http-status-codes")

class NotFound extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = NotFound