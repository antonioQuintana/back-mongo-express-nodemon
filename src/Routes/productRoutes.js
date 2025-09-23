const { Router } = require("express");

const productRoutes = Router();
//Productos
productRoutes.get("/", (req, res) => {
  res.send("Traer los productos");
});

//Exportamos la ruta de productos
module.exports = productRoutes;
