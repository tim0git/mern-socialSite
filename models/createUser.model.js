const User = require("../models/Schemas/UserSchema");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

exports.createNewUser = async (name, email, password) => {
  const avatar = gravatar.url(email, { s: 200, r: "pg", d: "mm" });
  user = new User({
    name,
    email,
    avatar,
    password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
};
