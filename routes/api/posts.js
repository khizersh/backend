const express = require('express');
const router = express.Router();

//  @route Get api/posts
// @description get all posts
//  @accsess public 
router.get('/' , (req , res) => res.send('posts route'));
module.exports = router;