const express = require("express");
//importamos la ruta principal
const mainRoute = require("./Routes/mainRoute");

const app = express();
//Middleware para que el servidor entienda JSON
app.use(express.json());
//Usamos la ruta principal
app.use("/api", mainRoute);

/*
  const morgan = require("morgan");
  app.use(morgan("dev"));

  app.use((req, res, next) => {
  console.log("Pasando por mi middleware");
  next();
}); //se crea un middleware propio  */

module.exports = app;
