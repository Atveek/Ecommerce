const { cart } = require("../model/cartSchema");
const { findCartProduct, finduser } = require("../services/cartServecies");
const { findOneproduct } = require("../services/productService");

async function addCart(req, res) {
  try {
    const user = req.user.userid;
    const isUser = await finduser({ user });
    const productsArray = req.body.productsArray;
    const [{ product, quantity }] = productsArray;

    if (!isUser) {
      const newCart = new cart({
        user,
        products: productsArray,
      });
      const result = await newCart.save();
      return res.send(result);
    } else {
      const result = await cart.findOne({ user });
      console.log(product);

      const itemAlreadyExist = result.products.filter((item) => {
        if (item.product == product) {
          return item;
        }
      });

      if (itemAlreadyExist.length <= 0) {
        await cart.updateOne(
          { user },
          { $addToSet: { products: req.body.productsArray } }
        );
      } else {
        await cart.updateOne(
          { user, "products.product": product },
          { $inc: { "products.$.quantity": 1 } }
        );
      }

      const updatedCart = await findCartProduct({ user });
      return res.send(updatedCart);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send("Error adding product to cart");
  }
}

async function allCartProduact(req, res) {
  try {
    const user = req.user.userid;
    const products = await findCartProduct({ user });
    const productList = [];

    for (const product of products[0].products) {
      const productItem = await findOneproduct({ _id: product.product });
      productList.push({
        product: productItem,
        quantity: product.quantity,
        _id: product._id,
      });
    }

    res.json(productList);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error fetching cart products");
  }
}

async function updateQuantity(req, res) {
  try {
    const user = req.user.userid;
    const productId = req.body.product;
    const quantity = req.body.quantity;
    console.log(user, productId, quantity);
    if (quantity === 0) {
      const newproducts = await cart.updateOne(
        { user: user },
        { $pull: { products: { _id: productId } } }
      );
      const a1 = await cart.find({ user });
      res.send(a1);
      if (!a1.products || a1.products.length === 0) {
        const result = await cart.deleteOne({ user });
        console.log(result);
      }
    } else {
      const newproducts = await cart.updateOne(
        { user: user, products: { $elemMatch: { _id: productId } } },
        { $set: { "products.$.quantity": quantity } }
      );
      res.send(newproducts);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart products");
  }
}

async function deleteCart(user) {
  try {
    const result = await cart.deleteOne({ user });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addCart, allCartProduact, updateQuantity, deleteCart };
