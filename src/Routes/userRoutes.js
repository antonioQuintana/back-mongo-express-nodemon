const { Router } = require("express");

const userRoutes = Router();

//Usuarios
userRoutes.get("/", (req, res) => {
  res.send("Traer los usuarios");
});
userRoutes.get("/:id", (req, res) => {
  res.send("Traer un usuario por ID");
});
userRoutes.post("/", (req, res) => {
  res.send("Usuario creado");
});
userRoutes.put("/:id", (req, res) => {
  res.send("Usuario modificado");
});
userRoutes.delete("/:id", (req, res) => {
  res.send("Usuario eliminado");
});

//Exportamos la ruta de usuarios
module.exports = userRoutes;
