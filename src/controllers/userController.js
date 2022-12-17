const express = require("express");
const User = require("../models/userModel");
const handleError = require("../helpers/errors");
const QueryMethod = require("../middlewares/query");
const UserJob = require("../models/userJobModel");

exports.updateUser = async (req, res) => {
  try {
  
    const user = req.user; // identify the user
    const userId = user._id 
    if (!userId) {   
      return res
        .status(401)
        .json({ success: false, message: "unauthorized user" });
    }

    const findUser = await User.findById(userId);
    findUser.skills = req.body.skills;  
    findUser.experience = req.body.experience;
    await findUser.save();
    return res.status(200).send({
      status: true,
      message: "Account has been updated successfully",
      updatedUser: findUser,
    });
  } catch (err) {
    const error = handleError(err);
    res.status(404).json({ error });
  }
};



exports.getUser = async (req, res) => {
  try {

    const user = req.user; // identify the user
    const userID = user._id;
    if (!userID ) {    
      return res
        .status(401)
        .json({ success: false, message: "unauthorized user" });
    }


    const singleApp = await UserJob.findOne({ userId : userID })  
    const applications = await UserJob.find({ userId : userID }, {userId:0, jobId:0, resume:0}, {limit:4}) // this removes the userId and jobId fields

    // checks if returned user is an employer and ommits the job application field
    if (user.role.includes("employer")) {
        return res.status(200).send({
            status: true,
            message: "User found",
            employer: user
          });
    }

    // checks if the returned user profile has a userJob 
    if (!singleApp) {
      return res.status(200).send({
        status: true,
        message: "User found",
        User: user,
        jobApps: "no job applications submitted yet"
      });
    } else {

        // Returns the user profile with available userJob
    if (singleApp)
        return res.status(200).send({
            status: true,
            message: "User found",
            User: user,
            jobApps: {applications}    
          });
    }

} catch (error) {
     return res.status(404).send( error.message );
   }
 };



exports.getAllUsers = async (req, res) => {
  try {

    const user = req.user
    const userId = user._id
    if (!userId) {  
      return res
      .status(401)
      .json({ success: false, message: "unauthorized user" });
    } 

    let queriedUsers = new QueryMethod(User.find(), req.query)
      .sort()
      .filter()
      .limit()
      .paginate();
    let users = await queriedUsers.query;
    res.status(200).json({
      status: true,
      message: "Users found",
      count: users.length,
      allUsers: users,
    });

  } catch (error) {
    return res.status(404).send({
      status: false,
      message: "No users found",
      err : error
    });
  }
};



exports.deleteUser = async (request, response) => {
  try {

    const user = request.user
    const userId = user._id
    if (!userId) {  
      return response
      .status(401)
      .json({ success: false, message: "unauthorized user" });
    }  

    const { id } = request.query;
    const findUser = await User.findByIdAndDelete(id);
    if (findUser) {
      return response.status(204).send({    // status code 204 no content is used for delete
        status: true,
        message: "User deleted successfully"
      });
    } else {
      return response.status(404).send({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return response.status(400).json( error.message )
  };
};
