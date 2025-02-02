const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: String,
  productprice: String,
  category: String,
  image: String,
  description: String,
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
