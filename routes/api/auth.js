const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//  @route Get api/auth
// @description get all posts
//  @accsess public 
router.get('/' ,auth ,  async (req , res) =>  {
    // res.json(req.user.id)
    try {
        let user = await User.findById(req.user.id).select('-password');
       return res.status(200).json(user);
        
    } catch (error) {
        console.log(error.message);
       return res.status(400).send('Something went wrong!');
    }

});


//  @route post api/auth
// @description verify user and send token back
// @accsess public
router.post(
    "/",
    [
      check("email", "Email is required!").isEmail(),
      check("password", "Password is required!").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("errors: ", errors.message);
        return res.status(400).json({ errors: errors.array() });
      }
      //  ==== verify user
  
      const {  email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials!" }] });
        }
   
 
        const isMatched = await bcrypt.compare(password , user.password);
        if(!isMatched){
            return res
            .status(400)
            .json({ errors: [{ msg: "Inalid credentials!" }] });
        }
    
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('JWTSecret')    ,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.log(er.message);
        return res.status(500).send("Server Error!");
      }
    }
  );
  

module.exports = router;