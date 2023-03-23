const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: [true, "Email will always be unique"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
