require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()

const connectDB = require("./db/connect")

// Routers
const authRoute = require("./routes/auth")
const jobRoute = require("./routes/job")

// authentication middleware
const authenticatUser = require("./middleware/authenticationMW")

// Error Handler
const errorHandlerMW = require("./middleware/error-handlerMW")
const notFoundMW = require("./middleware/not-foundMW")


app.use(express.json())  //to access data in req.body


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/job", authenticatUser, jobRoute)  //here we are adding "authenticatUser(middleware)" for all the jobs routes so one perticuler users can only access the its own job data not others data

app.use(notFoundMW)
app.use(errorHandlerMW)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))
    }
    catch (error){
        console.log(error.message)
    }
}

start()