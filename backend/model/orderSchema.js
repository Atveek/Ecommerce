const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
