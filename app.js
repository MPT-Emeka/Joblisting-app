const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
dotenv.config({ path: "./config.env" });
const UserRouter = require("./src/routes/userRoute");
const authRoutes = require("./src/routes/auth-route");
const jobRouter = require("./src/routes/jobRoute");
const userJobRouter = require("./src/routes/userJobRoute");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors"); 
app.use(express.json());

app.use(cookieParser());

// require routes




var accessLogStream = fs.createWriteStream(
  path.join("./src/utils", "access.log"),
  {
    flags: "a",
  }
);

app.use(cors())

app.use(morgan("dev", { stream: accessLogStream }));

app.use("/api/v1/auths", authRoutes);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/userjobs", userJobRouter);

// insert app.use (routers)




const db = () => {
    mongoose.connect(process.env.DB_URL);
 };
 db()
 mongoose.connection.once("open", () => {
   console.log("Connected To Database!");
 });
 
 module.exports = app;