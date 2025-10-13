const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");

const { Router } = require("express");

const mainRoute = Router();
//trae ruta de usuarios
mainRoute.use("/users", userRoutes);
//trae ruta de productos
mainRoute.use("/products", productRoutes);

mainRoute.use("/order", orderRoutes);
mainRoute.use("/cart", cartRoutes);

//Auth
mainRoute.use("/auth", require("./authRoutes"));

/* mainRoute.mainRoute //Ruta de prueba
  .get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
  }); */

//Exportamos la ruta principal
module.exports = mainRoute;
