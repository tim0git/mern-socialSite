const ENV = process.env.NODE_ENV || "development";

const mongoose = require("mongoose");
// require in mongoose to set up the db connection
const config = require("config");
// require in config to access the default.json URI file
const db = config.get("mongoURI");
// get mongoURI from default.json

/*const connectDB = {
  test: (test = async () => {
    try {
      await mongoose.connect(`mongodb://127.0.0.1/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("MongoDB connected Test Local");
    } catch (err) {
      console.log(err.message);
      // if error exit process with failure
      process.exit(1);
    }
  }),

  development: (development = async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("MongoDB connected Development Cloud");
    } catch (err) {
      console.log(err.message);
      // if error exit process with failure
      process.exit(1);
    }
  }),
};*/


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected Development Cloud");
  } catch (err) {
    console.log(err.message);
    // if error exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;
