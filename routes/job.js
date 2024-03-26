const express = require("express")
const Router = express.Router()

const { createJob, getJob, getAllJobs, updateJob, deleteJob } = require("../controllers/job")

Router.route("/").get(getAllJobs).post(createJob)
Router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob)

module.exports = Router;