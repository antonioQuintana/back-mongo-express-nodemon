const { Router } = require("express");

const productRoutes = Router();

const {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandlers");

//Productos
productRoutes.get("/", getAllProductsHandler);

productRoutes.get("/:id", getOneProductHandler);

productRoutes.post("/", createProductHandler);

productRoutes.put("/:id", updateProductHandler);

productRoutes.delete("/:id", deleteProductHandler);

//Exportamos la ruta de productos
module.exports = productRoutes;
