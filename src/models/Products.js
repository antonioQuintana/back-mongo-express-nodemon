const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    imgDir: { type: String, required: true },
  },
  { versionKey: false }
);

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
