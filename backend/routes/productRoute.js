const express = require("express");
const { authSeller } = require("../middleware/authSeller");
const { authBuyer } = require("../middleware/authBuyer");
const {
  sellerProduct,
  addProduct,
  allProduct,
  selectedProduct,
  selectedCategory,
} = require("../controllers/productController");
const routes = express.Router();

//seller's Product route
routes.post("/add", authSeller, addProduct);
routes.get("/seller", authSeller, sellerProduct);

//buyer's product route
routes.get("/buyer", authBuyer, allProduct);
routes.get("/:category", selectedCategory);
//combine product route
routes.get("/:category/:productid", selectedProduct);
routes.get("/:productid", selectedProduct);

module.exports = routes;
