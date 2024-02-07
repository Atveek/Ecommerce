//env file variable access
const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); //import express module
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDb = require("../config/conn");

connectDb();

//import routes
const user = require("../routes/userRoute");
const login = require("../routes/loginRoute");
const product = require("../routes/productRoute");
const category = require("../routes/categoryRoute");
const cart = require("../routes/cartRoute");
const morgan = require("morgan");
const colors = require("colors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
app.use("/user", user);
app.use("/login", login);
app.use("/product", product);
app.use("/category", category);
app.use("/cart", cart);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
