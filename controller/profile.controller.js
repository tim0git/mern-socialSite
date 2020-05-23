const Profile = require("../models/Schemas/ProfileSchema");
const User = require("../models/Schemas/UserSchema");

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .send({ message: "there is no profile for this user" });
    }
  } catch (err) {
    next(err);
  }
};
