const mongoose = require("mongoose");
const colors = require("colors");
const DBURL = process.env.DBURL || "mongodb://127.0.0.1/ecommerce";

const connectDb = async () => {
  try {
    await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
