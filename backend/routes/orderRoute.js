const express = require("express");
const { authBuyer } = require("../middleware/authBuyer");
const route = express.Router();
// const authSeller = require("../middleware/authSeller");
const { addOrder, shawOrder } = require("../controllers/orderController");

// route.get("/seller", authSeller);
route.post("/add", authBuyer, addOrder);
route.get("/shaw", authBuyer, shawOrder);

module.exports = route;
