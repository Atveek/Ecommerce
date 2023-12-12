//env file variable access
const dotenv = require("dotenv");
dotenv.config();

//import express module
const express = require("express");
const app = new express();
const port = process.env.PORT || 5000;
require("../config/conn");

//routes
const user = require("../routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/user", user);

app.listen(port, () => {
  console.log(`${port} listing..`);
});
