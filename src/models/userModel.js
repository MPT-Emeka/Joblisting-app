const mongoose = require("mongoose")
const { isEmail } = require("validator")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength : [4, "name should have more than 4 characters"],
        maxlength : [30, "name should be less than 30 characters"]
    },
    email : {
        type : String,
        required : [true, "Please enter an email"],
        unique : true,
        lowercase : true,
        validate : [isEmail, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "Password field is required"],
        minlength : [6, "Password is less than 6 characters"],
        select: false
    },
    confirmPassword : {
        type : String,
        required : [true, "Make sure input is the same as password"],
        minlength : [6, "Password is less than 6 characters"],
        select: false
    },
    skills : {
        type : Array,
        required : [true, "user skill is required"],
        minlength : [6, "skill field should have more than 6 characters"],
        maxlength : [30, "skill should be less than 30 characters"]
    },
    experience : {
        type : String,
        required : [true, "user experience is required"],
        enum: ["trainee", "junior", "mid-level", "senior", "manager"]
    },
    location : {
        type : String,
        required : [true, "user location is required"],
        minlength : [3, "location field should have more than 6 characters"],
        maxlength : [15, "location field should be less than 15 characters"]

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "employer"],
    }
},
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;