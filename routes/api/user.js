const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const config = require('config');
const bcrypt = require("bcryptjs");

//  @route post api/user
// @description add  user
// @accsess public
router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Email is required!").isEmail(),
    check("password", "Password is required!").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors: ", errors.message);
      return res.status(400).json({ errors: errors.array() });
    }
    //  ==== saving user

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist!" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

router.get("/", (req, res) => {
  res.send("get api");
});

module.exports = router;
