const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

const productList = mongoose.model("product", productSchema);

module.exports.productList = productList;
