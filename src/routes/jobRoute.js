const express = require("express");
const JobController = require("../controllers/jobController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

app.use(express.json());
const router = express.Router();

const { createJob, updateJob, getJob, getJobListing, deleteJob, recommendJob } = JobController;



router.route("/job").post(auth, checkUser("employer"), createJob).get(getJobListing).delete(auth, checkUser("employer"), deleteJob);
router.route("/job/:id").get(getJob).put(auth, checkUser("employer"), updateJob);
router.route("/recommendjob").get(auth, recommendJob);   



module.exports = router;