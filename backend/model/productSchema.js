const mongoose = require("mongoose");
const { user } = require("./userSchema");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  seller: { type: mongoose.Schema.ObjectId, ref: user },
});

const productList = mongoose.model("product", productSchema);

module.exports.productList = productList;
