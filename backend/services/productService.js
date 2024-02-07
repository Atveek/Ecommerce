const { productList } = require("../model/productSchema");

async function findproduct(condition) {
  try {
    const product = await productList.find(condition);
    return product;
  } catch (err) {
    console.log(err);
  }
}

async function findOneproduct(condition) {
  try {
    const product = await productList.findOne(condition);
    return product;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findproduct, findOneproduct };
