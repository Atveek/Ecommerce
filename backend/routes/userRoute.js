const express = require("express");
const route = express.Router();
const { user } = require("../model/userSchema");

route.post("/", async (req, res) => {
  try {
    const userdata = new user(req.body);
    const result = await userdata.save();
    res.send(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
