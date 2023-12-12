const mongoose = require("mongoose");
const DBURL = process.env.DBURL || "mongodb://127.0.0.1/ecommerce";

//connecting mongodb to backend

mongoose
  .connect(DBURL)
  .then(() => {
    console.log("Database connect succesfully...");
  })
  .catch((e) => {
    console.log("Database not connected ...", e);
  });
