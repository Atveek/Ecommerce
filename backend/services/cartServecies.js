const { cart } = require("../model/cartSchema");

async function findCartProduct(condition) {
  try {
    const product = await cart.find(condition).select({ products: 1 });
    return product;
  } catch (err) {
    console.log(err);
  }
}
async function finduser(condition) {
  try {
    const product = await cart.find(condition);
    if (product.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false; // Return false in case of an error
  }
}

module.exports = { findCartProduct, finduser };
