const express = require("express");
const { authSeller } = require("../middleware/authSeller");
const { authBuyer } = require("../middleware/authBuyer");
const {
  sellerProduct,
  addProduct,
  allProduct,
  selectedProduct,
} = require("../controllers/productController");
const routes = express.Router();

//seller's Product route
routes.post("/add", authSeller, addProduct);
routes.get("/seller", authSeller, sellerProduct);

//buyer's product route
routes.get("/buyer", authBuyer, allProduct);

//combine product route
routes.get("/:productid", selectedProduct);

module.exports = routes;
