const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Pasando por mi middleware");
  next();
}); //se crea un middleware propio

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

module.exports = app;
