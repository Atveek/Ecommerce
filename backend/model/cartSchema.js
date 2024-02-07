const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "user", unique: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1, // Default quantity if not provided
      },
    },
  ],
});

const cart = mongoose.model("cart", cartSchema);

module.exports.cart = cart;
