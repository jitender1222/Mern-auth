const express = require("express");
const { loginUser, registerUser } = require("../Controller/userController");

// create a router
const routes = express.Router();

// to register the user
routes.post("/register", registerUser);

// to login the user
routes.post("/login", loginUser);

module.exports = routes;
