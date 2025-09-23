const express = require("express");
const app = express();

//Usuarios
app.get("/api/users", (req, res) => {
  res.send("Traer los usuarios");
});
app.get("/api/users/:id", (req, res) => {
  res.send("Traer un usuario por ID");
});
app.post("/api/users", (req, res) => {
  res.send("Usuario creado");
});
app.put("/api/users/:id", (req, res) => {
  res.send("Usuario modificado");
});
app.delete("/api/users/:id", (req, res) => {
  res.send("Usuario eliminado");
});

//Productos
app.get("/api/products", (req, res) => {
  res.send("Traer los productos");
});

/*
  const morgan = require("morgan");
  app.use(morgan("dev"));

  app.use((req, res, next) => {
  console.log("Pasando por mi middleware");
  next();
}); //se crea un middleware propio  */

module.exports = app;
