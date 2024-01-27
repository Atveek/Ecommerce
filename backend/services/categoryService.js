const category = require("../model/categorySchema");

async function findcategory(condition) {
  try {
    const product = await category.find(condition);
    return product;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { findcategory };
