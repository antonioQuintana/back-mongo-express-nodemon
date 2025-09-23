const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

const { Router } = require("express");

const mainRoute = Router();
//trae ruta de usuarios
mainRoute.use("/api/users", userRoutes);
//trae ruta de productos
mainRoute.use("/api/products", productRoutes);

//Ruta de prueba

mainRoute.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

//Exportamos la ruta principal
module.exports = mainRoute;
