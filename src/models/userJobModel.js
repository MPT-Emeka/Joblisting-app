const mongoose = require("mongoose")
const userJobSchema = new mongoose.Schema(
{
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       // autopopulate: true 
    },
      
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Enter jobId"],
        ref: "Job",
       // autopopulate: true
    },

    resume: {
        type: String,
        required: [true, "Enter resume doc URL"]
    },
      
    status : {
        type : String,
        default : "applied",
        enum : ["applied", "shortlisted", "rejected"],
    }   
}, 
    { timestamps: true }
);

userJobSchema.plugin(require("mongoose-autopopulate"));

const UserJob = mongoose.model("UserJob", userJobSchema);

module.exports = UserJob