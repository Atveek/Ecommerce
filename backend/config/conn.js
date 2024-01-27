const mongoose = require("mongoose");
const DBURL = process.env.DBURL || "mongodb://127.0.0.1/ecommerce";

//connecting mongodb to backend

mongoose;
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Adjust the timeout value
});
