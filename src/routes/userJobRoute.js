const express = require("express");
const UserJobController = require("../controllers/userJobController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

app.use(express.json());
const router = express.Router();

const { applyJob, updateUserJob, getUserJob, getAllUserJobs, deleteUserJob } = UserJobController;



router.route("/userjob").post(auth, applyJob).delete(auth, checkUser("employer"), deleteUserJob).get(auth, checkUser("employer"), getAllUserJobs);
router.route("/userjob/:id").patch(auth, checkUser("employer"), updateUserJob).get(auth, getUserJob);

module.exports = router;