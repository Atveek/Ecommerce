const category = require("../model/categorySchema");
const { findcategory } = require("../services/categoryService");

async function addCategory(req, res) {
  try {
    const addcategory = new category(req.body);
    const result = await addcategory.save();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
}

async function getCategory(req, res) {
  try {
    const result = await findcategory();
    res.json(result);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = { addCategory, getCategory };
