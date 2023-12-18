const category = require("../model/categorySchema");

async function findcategory(condition) {
  try {
    const product = await category.find(condition);
    return product;
  } catch (err) {
    console.log(err);
  }
}

async function findsubcategory(condition) {
  try {
    const product = await category.findOne(condition);
    console.log(product);
    return product;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findcategory, findsubcategory };
