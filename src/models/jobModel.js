const mongoose = require("mongoose")
const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "job title is required"],
        minlength : [4, "title should have more than 4 characters"],
        maxlength : [20, "title should be less than 20 characters"]
    },
    organisation : {
        type: String,
        required: [true, "Organisation name is required"],
        minlength : [4, "title should have more than 4 characters"],
        maxlength : [20, "title should be less than 20 characters"]
    },
    employerId : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    description : {
        type : String,
        required : [true, "job description is required"],
        minlength : [6, "job description should have more than 6 characters"],
        maxlength : [80, "job description should be less than 40 characters"]
    },
    location : {
        type : String,
        required : [true, "job location is required"],
        minlength : [3, "location field should have more than 6 characters"],
        maxlength : [15, "location field should be less than 15 characters"]
    },
    experience : {
        type : String,
        required : [true, "user experience is required"],
        enum: ["trainee", "junior", "mid-level", "senior", "manager"]
    },
    jobType : {
        type : String,
        required : [true, "job type is required"],
        minlength : [3, "job type should have more than 3 characters"],
        maxlength : [30, "job type should be less than 15 characters"]
    },
    keywords : {
        type : Array,
        required : [true, "keywords are required"],
        minlength : [3, "keywords should have more than 6 characters"],
        maxlength : [15, "keywords should be less than 15 characters"]

    }
    },
    { timestamps: true }
);


const Job = mongoose.model("Job", jobSchema);

module.exports = Job;