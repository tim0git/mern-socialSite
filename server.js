const express = require("express");
const connectDB = require("./config/dbconfig");

const app = express();

// connect to mongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
