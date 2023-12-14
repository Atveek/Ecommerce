const express = require("express");
const route = express.Router();
const { user } = require("../model/userSchema");
const bcrypt = require("bcrypt");

route.post("/", async (req, res) => {
  try {
    const finduser = await user.findOne({ email: req.body.email });
    if (finduser) {
      res.status(400).send("email already exist");
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
      res.send(result);
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
