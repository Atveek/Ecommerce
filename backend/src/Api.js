const axios = require("axios");
const mongoose = require("mongoose");
const DBURL = process.env.DBURL || "mongodb://127.0.0.1/ecommerce";

//connecting mongodb to backend
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Adjust the timeout value
});

const { productList } = require("../model/productSchema");
const category = require("../model/categorySchema");

async function getApi() {
  try {
    const result = await axios.get("https://dummyjson.com/product");
    const products = result.data.products;

    // Assume you have a category named "smartphones" in the database
    // Save each product to the database
    for (const productData of products) {
      const product = new productList({
        title: productData.title,
        img: productData.thumbnail,
        category: productData.category,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        brand: productData.brand, // Make sure to check if brand exists in your productData
        discountPercentage: productData.discountPercentage, // Make sure to check if discountPercentage exists
        rating: productData.rating, // Make sure to check if rating exists
        thumbnail: productData.thumbnail,
        images: productData.images,
        seller: "657a97122d9026aec65d7286",
      });

      await product.save();
      const c = await category.findOne({
        name: productData.category,
      });
      if (!c) {
        const category1 = new category({
          name: productData.category,
        });
        await category1.save();
      }
    }

    console.log("Products saved to the database");
  } catch (error) {
    console.error("Error fetching or saving data:", error.message);
  }
}

// Call the function
getApi();
