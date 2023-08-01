const express = require("express");
const {
  loginUser,
  registerUser,
  profile,
} = require("../Controller/userController");
const singleUpload = require("../middleware/multer");

// create a router
const routes = express.Router();

// to register the user
routes.post("/register", singleUpload, registerUser);

// to login the user
routes.post("/login", singleUpload, loginUser);

routes.get("/profile", singleUpload, profile);

module.exports = routes;
