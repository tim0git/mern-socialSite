const express = require("express");
const cors = require("cors"); //  'This is CORS-enabled for all origins!'
const connectDB = require("./config/dbconfig");
const apiRouter = require("./routes/api/apiRouter");
const {
  handleMongoDB_Error,
  handleCustomError,
  handleInternalError,
} = require("./error/errorHandling");

const app = express();

// connect to mongoDB
connectDB();

app.use(express.json({ extended: false }));

app.use(cors()); //  'This is CORS-enabled for all origins!'

app.get("/", (req, res) => {
  res.send("API Running");
});

// working
app.use("/api", apiRouter);

// error handle
app.use(handleMongoDB_Error);
app.use(handleCustomError);
app.use(handleInternalError);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

module.exports = app;
