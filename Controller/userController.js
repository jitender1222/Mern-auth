// importing the user schema
const User = require("../Schema/userSchema");
const cloudinary = require("cloudinary");

// import bcryptjs
const bcrypt = require("bcryptjs");
const getDataUri = require("../dataUri");

// exporting the logic

// logic for register the user
exports.registerUser = async (req, res) => {
  try {
    // get the name email and password from the user

    const file = req.file;
    const dataUri = getDataUri(file);

    const { name, email, password } = req.body;

    // Checking the fields

    if (!name || !email || !password || !file) {
      res.status(401).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // the user is already existing or not

    const existingUser = await User.findOne({ email });

    const myCloud = await cloudinary.v2.uploader.upload(dataUri.content);

    // if the user exists
    if (existingUser) {
      res.status(401).send({
        message: "user already exist",
        success: false,
      });
    }

    // to hash a password
    const hashPassword = await bcrypt.hash(password, 10);

    // create a new user and save it into the database
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    await newUser.save();

    // return the reponse
    return res.status(200).send({
      message: "User saved successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "error",
    });
  }
};

// to login the user

exports.loginUser = async (req, res) => {
  // checking fields
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({
      success: false,
      message: "All fields are required",
    });
  }

  // if the user is not present

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).send({
      message: "User is not present",
      success: false,
    });
  }

  // check the password

  try {
    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      res.status(401).send({
        success: false,
        message: "Password is not correct",
      });
    }

    res.status(200).send({
      success: true,
      message: "User login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "error in login the user",
      success: "false",
    });
  }
};

exports.profile = async (req, res) => {
  const { name, email, url } = req.body;

  return res.status(200).send({
    success: true,
    name,
    email,
    url,
  });
};
