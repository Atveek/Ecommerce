const express = require("express");
const route = express.Router();
const { user } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

route.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const finduser = await user.findOne({ email: req.body.email });
    if (finduser) {
      const result = await bcrypt.compare(password, finduser.password);
      if (result) {
        const token = jwt.sign(
          { userid: finduser._id, email: finduser.email, role: finduser.role },
          secret
        );
        res.json({ token });
      } else {
        res.status(404).send({ error: "Invalid username or password." });
      }
    } else {
      res.status(404).send({ error: "Invalid username or password." });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
