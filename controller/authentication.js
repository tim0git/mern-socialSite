const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "no token authorisation denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({ message: "token is not valid" });
  }
};
