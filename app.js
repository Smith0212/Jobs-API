require("dotenv").config()
require("express-async-errors")

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


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

//security middlewares
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
    res.send("Jobs API")
})

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