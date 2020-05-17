const mongoose = require("mongoose");
// require in mongoose to set up the db connection
const config = require("config");
// require in config to access the defaut.json URI file
const db = config.get("mongoURI");
// get mongoURI from default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    // if error exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
