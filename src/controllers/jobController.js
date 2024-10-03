const express = require("express");
const Job = require("../models/jobModel");
const jobErrorHandler = require("../helpers/jobErrorHandler");
const QueryMethod = require("../middlewares/query")

exports.createJob = async (req, res) => {
    try {

        const user = req.user; // identify the user 
        const userId = user._id
        if (!userId) { 
          return res
            .status(401)
            .json({ success: false, message: "unauthorized user" });
        }

    const { title, organisation, employerId, description, location, experience, jobType, keywords } = req.body;


        // Confirms the employerId is used to create the job posting
    if (userId != employerId) {
        return res.status(403).json({
            status: false,
            message: "Forbidden access"
        })
      }

        const job = await Job.create({
            title,
            organisation,
            employerId,
            description,
            location,
            experience,
            jobType,
            keywords,
          });
    
          return res.status(201).json({
            status: true,
            data: {
                job,
            },
          });
 
  } catch (err) {
    const error = jobErrorHandler(err); //check error handler
    res.status(400).json({ error });
  }
};




exports.updateJob = async (req, res) => {
    try {
    
      const { id }= req.params;
      const user = req.user; 
      const userId = user._id
      console.log(userId)
      if (!userId) {    
        return res
          .status(401)
          .json({ success: false, message: "unauthorized user" });
      };
  

      // confirms the employerId of the job to update with the userId
    if (userId != req.body.employerId) {
        return res.status(403).json({
           status: false,
           message: "Unauthorised access to job"
       })
     };



      const findJob = await Job.findById(id);
     // Checks for the job to update. 
      if (!findJob) {
        return res.status(404).json({
            status: false,
            message: "Job to update not found"
        });
      };

      findJob.location = req.body.location;
      findJob.experience = req.body.experience;
      await findJob.save();
      return res.status(200).json({
        status: true,
        message: "Job has been updated successfully",
        updatedJob: findJob,
      });
    } catch (err) {
      const error = jobErrorHandler(err);
      res.status(400).json({ error });
    };
  };





exports.getJob = async (req, res) => {
  try {

    const id = req.params.id;
    const findOneJob = await Job.findById(id);
    if (!findOneJob) {
      return res.status(404).send({
        status: false,
        message: "Job not found",
      });
    } else {
      return res.status(200).send({
        status: true,  
        message: "Job found",
        job: findOneJob,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return res.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return res.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
};





exports.getJobListing = async (request, response) => {
  try {

    let queriedJobs = new QueryMethod(Job.find(), request.query)
      .sort()
      .filter()
      .limit()
      .paginate();
    let jobs = await queriedJobs.query;
    response.status(200).json({
      status: true,
      message: "Jobs found",
      count: jobs.length,
      allJobs: jobs,
    });
  } catch (err) {
    return response.status(404).send({
      status: false,
      message: "No jobs found",
    });
  }
};






exports.deleteJob = async (request, response) => {
  try {

    const user = request.user
    const userId = user._id
    if (!userId) {  
      return response
      .status(401)
      .json({ success: false, message: "unauthorized user" });
    }  

 

    const { id } = request.query;
    const findJob = await Job.findByIdAndDelete(id);
    if (findJob) {
      return response.status(204).json({
        status: true,
        message: "Job deleted successfully"
      });
    } else {
      return response.status(404).send({
        status: false,
        message: "Job not found",
      });
    }
  } catch (error) {
    return response.status(400).json({ error })
  };
};




exports.recommendJob = async (req, res) => {
    try {
  
      const user = req.user; // identify the user
      let userId = user._id
      if (!userId) {

          let jobsReco = await Job.find({ keywords : req.query.skills, experience : req.query.experience }, null, {limit:10}) 
  
          if (!jobsReco) {
              return res.status(404).json({
                  status: false,
                  message: "No job match"
              })
          };
          
          return res.status(200).json({
              status: true,
              message: "Job matches",
              jobs: jobsReco
          });
      }
  
      
// check for recommended job
let jobsRecommended = await Job.findOne({ title : user.skills, experience : user.experience }) //null, {limit:10}).lean()  

if (!jobsRecommended) {
    return res.status(404).json({
        status: false,
        message: "No recommended jobs"
    })
}

return res.status(200).json({
    status: true,
    message: "Recommended jobs",
    jobs: jobsRecommended
})

  } catch (err) {
       const error = jobErrorHandler(err)
        return res.status(400).json({ error });
    }
  };
  
  
  
  