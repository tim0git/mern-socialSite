const express = require('express')
const profileRouter = express.Router();

// @ router GET api/profile
// @ desc Test route
// @ access Public
profileRouter.route('/').get((req,res,next)=>{res.send('profile Route')})

module.exports = profileRouter;