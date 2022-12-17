//handle errors
const jobErrorHandler = (err) => {
    console.log(err.message);
    let errors = { title : "", organisation : "", employerId : "", description : "", location : "", experience : "", jobType : "", keywords : "" };

    //duplicate error code
    if(err.code === 11000) {
        errors.email = "email already registered";

        return errors;
    }
    
    //validate errors
    if(err.message.includes('Job validation failed' )) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}

module.exports = jobErrorHandler;