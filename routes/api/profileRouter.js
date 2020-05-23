const express = require("express");
const profileRouter = express.Router();
const { auth, loginUser } = require("../../controller/authentication");
const {
  getProfile,
  getAllProfiles,
  getProfileByUserId,
  updateExperience,
  deleteExperienceById,
  updateEducation,
  deleteEducationById,
  getGithubProfile
} = require("../../controller/profile.controller");
const {
  createProfileCheck,
  updateExperienceChecks,
  updateEducationChecks,
} = require("../../models/inputValidation");
const { createUserProfile } = require("../../controller/profile.controller");
const { deleteUserById } = require("../../controller/Users.controller");
const { handle405 } = require("../../error/errorHandling.js");


// @ router GET api/profile/:user_id && DELETE api/profile/:user_id
// @ desc fetch and delete user profile by id
// @ access Public & Private
profileRouter
  .route("/user/:user_id")
  .get(getProfileByUserId)
  .delete(auth, deleteUserById)
  .all(handle405);
 
// @ router GET api/profile
// @ desc Get all profiles (sensative info omitted such as password & email address)
// @ access Public 
profileRouter
  .route("/")
  .get(getAllProfiles)
  .post([auth, [...createProfileCheck]], createUserProfile)
  .all(handle405);

// @ router GET api/profile/me
// @ desc Get logged in profile
// @ access Private
profileRouter.route("/me").get(auth, getProfile).all(handle405);

// @ router PUT api/profile/experience
// @ desc Create experience by user ID
// @ access Private
profileRouter
  .route("/experience")
  .put([auth, [...updateExperienceChecks]], updateExperience)
  .all(handle405);

// @ router DELETE api/profile/experience 
// @ desc Delete experience by exp ID
// @ access Private
profileRouter
  .route("/experience/:exp_id")
  .delete(auth, deleteExperienceById)
  .all(handle405);

// @ router GET api/profile/education
// @ desc Create eduction by User ID
// @ access Private
profileRouter
  .route("/education")
  .put([auth, [...updateEducationChecks]], updateEducation)
  .all(handle405);

// @ router DELETE api/profile/education
// @ desc Delete education by exp ID
// @ access Private
profileRouter
  .route("/education/:edu_id")
  .delete(auth, deleteEducationById)
  .all(handle405);

// @ router DELETE api/profile/education
// @ desc Delete education by exp ID
// @ access Private
profileRouter
  .route("/github/:username").get(getGithubProfile).all(handle405)

module.exports = profileRouter;
