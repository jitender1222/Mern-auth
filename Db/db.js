const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected db successfully ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongo error ${error}`);
  }
};

module.exports = connectDb;
