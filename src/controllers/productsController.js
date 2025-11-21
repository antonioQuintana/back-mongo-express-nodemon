//Controladores de Productos
const Product = require("../models/Products"); //importamos el modelo de producto
const mongoose = require("mongoose");

const createProductController = async (name, description, price, stock, category, imgDir) => {
  const newProduct = await new Product({ name, description, price, stock, category, imgDir });
  await newProduct.save();
  return newProduct;
};
const getAllProductsController = async () => {
  if (!Product.length) {
    throw new Error("No hay productos registrados");
  }
  return await Product.find();
};
const getProductByNameController = async (name) => {
  if (!name || typeof name !== "string") {
    throw new Error("Nombre inválido");
  }

  const primeraPalabra = name.trim().split(" ")[0];
  const regex = new RegExp(`${primeraPalabra}`, "i");

  const productByName = await Product.find({ name: regex });
  if (!productByName.length) {
    throw new Error("Producto no encontrado");
  }
  return productByName;
};
const getOneProductById = async (id) => {
  const productById = await Product.findById(id);
  if (!productById) {
    throw new Error("Producto no encontrado");
  }
  return productById;
};
const updateProductController = async (id, name, description, price, stock, category, imgDir) => {
  const newProduct = { name, description, price, stock, category, imgDir };
  const productById = await Product.findByIdAndUpdate(id, newProduct, {
    new: true,
  });

  return productById;
};
const deleteProductController = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }
  const productById = await Product.findByIdAndDelete(id);
  return productById;
};
module.exports = {
  createProductController,
  getAllProductsController,
  getProductByNameController,
  getOneProductById,
  updateProductController,
  deleteProductController,
};
