const express = require('express')
const postsRouter = express.Router();

// @ router GET api/posts
// @ desc Test route
// @ access Public
postsRouter.route('/').get((req,res,next)=>{res.send('posts Route')})

module.exports = postsRouter;