const order = require("../model/orderSchema");
const { cart } = require("../model/cartSchema");
const { findOneproduct } = require("../services/productService");
const { deleteCart } = require("../controllers/cartController");

async function addOrder(req, res) {
  try {
    const user = req.user.userid;
    console.log(user);
    const cartOrder = await cart.findOne({ user });
    const orderResults = [];
    for (const product of cartOrder.products) {
      const productItem = await findOneproduct({ _id: product.product });
      console.log(productItem);

      const order1 = new order({
        user,
        seller: productItem.seller,
        product: product.product,
        quantity: product.quantity,
        status: "Processing",
        date: Date.now(),
      });

      const result = await order1.save();
      console.log(result);
      orderResults.push(result);
    }
    await deleteCart(user);
    res.send(orderResults);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding order");
  }
}

async function shawOrder(req, res) {
  try {
    const user = req.user.userid;
    console.log(user);
    const orders = await order.find({ user });
    console.log(orders);
    const productlist = [];
    for (const orderItem of orders) {
      const productItem = await findOneproduct({
        _id: orderItem.product, // Access product ID from orderItem
      });
      const productdetail = {};
      productdetail.product = productItem.title; // Use 'product' as key for product title
      productdetail.quantity = orderItem.quantity; // Access quantity from orderItem
      productdetail.status = orderItem.status; // Access status from orderItem
      productdetail.date = new Date(orderItem.date).toLocaleDateString("en-GB");
      productlist.push(productdetail);
    }
    res.send(productlist);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching orders");
  }
}

module.exports = { addOrder, shawOrder };
