const express = require("express");
const { authBuyer } = require("../middleware/authBuyer");
const {
  addCart,
  allCartProduact,
  updateQuantity,
} = require("../controllers/cartController");
const routes = express.Router();

routes.post("/add", authBuyer, addCart);
routes.get("/shaw", authBuyer, allCartProduact);
routes.put("/update", authBuyer, updateQuantity);
module.exports = routes;
