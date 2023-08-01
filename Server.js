// require express
const express = require("express");
const connectDb = require("./Db/db");
const cors = require("cors");

const cloudinary = require("cloudinary").v2;

// taken the data from the object
const app = express();

const fs = require("fs");

// require a dot env file
require("dotenv").config();

// created a PORT
const PORT = process.env.PORT || 8089;

// middlewear
app.use(cors());
app.use(express.json());

// router
const userRoute = require("./Routes/routes");

// starting the database
connectDb();

cloudinary.config({
  cloud_name: "dhmh4xpkr",
  api_key: "421456475899664",
  api_secret: "I9B43F-hdrmmNRLpK4VGpO89-3Q",
});

// routes
app.use("/api/v1/user", userRoute);

// making the req
app.get("/api/v1/user/", (req, res) => {
  res.status(200).send("Hello world");
});

// listen to the PORT
app.listen(PORT, () => {
  console.log(`server is running at PORT ${PORT}`);
});
