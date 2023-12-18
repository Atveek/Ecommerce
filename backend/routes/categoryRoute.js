const express = require("express");
const {
  addCategory,
  getCategory,
  getSubategory,
} = require("../controllers/categoryController");
const routes = express.Router();

routes.post("/add", addCategory);
routes.get("/", getCategory);
routes.get("/:category", getSubategory);

module.exports = routes;
