const category = require("../model/categorySchema");
const {
  findcategory,
  findsubcategory,
} = require("../services/categoryService");

async function addCategory(req, res) {
  try {
    const addcategory = new category(req.body);
    const result = await addcategory.save();
    console.log(result);
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
async function getSubategory(req, res) {
  try {
    const result = await findsubcategory({ name: req.params.category });
    console.log(result);
    const Subcategory = result.subcategory;
    res.json(Subcategory);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = { addCategory, getCategory, getSubategory };
