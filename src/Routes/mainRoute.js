const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

const { Router } = require("express");

const mainRoute = Router();
//trae ruta de usuarios
mainRoute.use("/users", userRoutes);
//trae ruta de productos
mainRoute.use("/products", productRoutes);

//Auth
mainRoute.use("/auth", require("./authRoutes"));

/* mainRoute.mainRoute //Ruta de prueba
  .get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
  }); */

//Exportamos la ruta principal
module.exports = mainRoute;
