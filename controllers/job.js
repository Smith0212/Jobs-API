const Job = require("../models/job")
const { StatusCodes } = require("http-status-codes")
const { BadRequest, NotFound } = require("../errors")

const getJob = async(req, res) => {
    const {user: {userID}, params: {id: jobID}} = req //extrect userID from req.user and jobID from params
    const job = await Job.findOne({_id: jobID, createdBy: userID})  
    if(!job){
        throw new NotFound(`No job with ID: ${jobID}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const getAllJobs = async(req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userID }) //only display all task of perticuler user
    res.status(StatusCodes.OK).json({jobs, count: jobs.length }).sort("createdAt")
}

const createJob = async(req, res) => {
    // here using "req.body.createBy" we are adding new element in body obj as "createBy" and according to schema "createBy" element store Obj ID which is store in "req.user" from "authenticationMW.js" middleware
    req.body.createdBy = req.user.userID

    const job = await Job.create(req.body)
    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async(req, res) => {
    const { body: {company, position}, user: {userID}, params: {id: jobID} } = req
    if(company === "" || position === ""){
        throw new BadRequest("Company or Position field cannot be empty")
    }
    const job = await Job.findOneAndUpdate({_id: jobID, createdBy: userID}, req.body, {new: true, runValidators: true})
    if(!job){
        throw new NotFound(`No job with ID: ${jobID}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async(req, res) => {
    const { user: { userID }, params: { id: jobID } } = req;
    const job = await Job.findOneAndRemove({ _id: jobID, createdBy: userID });
    if (!job) {
        throw new NotFound(`No job with ID: ${jobID}`);
    }
    res.status(StatusCodes.OK).send("Job deleted successfully.");
};


module.exports = {
    getJob,
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
}