const Profile = require("../models/Schemas/ProfileSchema");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

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

exports.createUserProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).send(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.status(201).send(profile);
  } catch (err) {
    next(err);
  }
};

exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).send(profiles);
  } catch (error) {
    next(error);
  }
};

exports.getProfileByUserId = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const profile = await Profile.findOne({ user: user_id }).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile)
      return res.status(404).send({ message: "no profile for this user" });
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateExperience = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;
  const { id } = req.user;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

exports.deleteExperienceById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile)
      return res.status(404).send({ message: "no profile for this user" });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  }
  const {
    school,
    qualification,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const { id } = req.user;

  const newEdu = {
    school,
    fieldofstudy,
    qualification,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

exports.deleteEducationById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile)
      return res.status(404).send({ message: "no profile for this user" });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

exports.getGithubProfile = (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    }
    request(options, (error, response, body) => {
      if (error) next(error);
      if (response.statusCode !== 200) {
        return res.status(400).send({ message: "github profile not found" });
      }
      res.status(200).send(JSON.parse(body));
    });
  } catch (error) {
    next(error);
  }
};
