const express = require("express");
const morgan = require("morgan");
//importamos la ruta principal
const mainRoute = require("./Routes/mainRoute");

const app = express();
//Middleware para que el servidor entienda JSON
app.use(express.json());
//Middleware para ver las peticiones por consola
app.use(morgan("dev"));
//Usamos la ruta principal
app.use("/api", mainRoute);

/*
  //se crea un middleware propio

  app.use((req, res, next) => {
  console.log("Pasando por mi middleware");
  next();
  
});*/

module.exports = app;
