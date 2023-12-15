const express = require("express");
const route = express.Router();
const { user } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

route.post("/", async (req, res) => {
  try {
    const finduser = await user.findOne({ email: req.body.email });
    if (finduser) {
      res.status(404).send("email already exist");
    } else {
      const { name, email, password, role } = req.body;
      const hashpassword = await bcrypt.hash(password, 10);
      const userdata = new user({
        name,
        email,
        password: hashpassword,
        role,
      });
      const result = await userdata.save();
      const token = jwt.sign(
        { userid: result._id, email: result.email, role: result.role },
        secret
      );
      res.json({ token });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
