//env file variable access
const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); //import express module
const app = new express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("../config/conn");

//import routes
const user = require("../routes/userRoute");
const login = require("../routes/loginRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());

//routes
app.use("/user", user);
app.use("/login", login);

app.listen(port, () => {
  console.log(`${port} listing..`);
});
