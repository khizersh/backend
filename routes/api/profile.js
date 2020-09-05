const express = require('express');
const router = express.Router();

//  @route Get api/profile
// @description get all profile
//  @accsess public 
router.get('/' , (req , res) => res.send('Profile route'));

module.exports = router;