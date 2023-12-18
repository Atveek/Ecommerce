const { productList } = require("../model/productSchema");

const { findproduct, findOneproduct } = require("../services/productService");

async function addProduct(req, res) {
  try {
    const user = req.user.userid;
    const { title, img, category, subcategory, description, price, stock } =
      req.body;
    console.log(user);
    const product = new productList({
      title,
      img,
      category,
      subcategory,
      description,
      price,
      stock,
      seller: user,
    });
    const result = await product.save();
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send("product can't added");
  }
}

async function sellerProduct(req, res) {
  const user = req.user;
  if (user.role === "seller") {
    const products = await findproduct({ seller: user.userid });
    res.json(products);
  } else {
    res.status(404).send("product can't shaw");
  }
}

async function allProduct(req, res) {
  try {
    const products = await findproduct();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(404).send("product can't shaw");
  }
}

async function selectedProduct(req, res) {
  try {
    const subcategory = req.params.subcategory;
    console.log("controller called...");
    const product = await findOneproduct({
      subcategory,
      _id: req.params.productid,
    });
    console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(404).send("product can't shaw");
  }
}

async function selectedCategory(req, res) {
  try {
    const product = await findproduct({
      subcategory: req.params.subcategory,
    });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(404).send("product can't shaw");
  }
}

module.exports = {
  addProduct,
  sellerProduct,
  allProduct,
  selectedProduct,
  selectedCategory,
};
