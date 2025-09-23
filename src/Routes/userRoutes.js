const { Router } = require("express");

const userRoutes = Router();
const {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../handlers/userHandlers");

//Usuarios
userRoutes.get("/", getAllUsersHandler);

userRoutes.get("/:id", getOneUserHandler);

userRoutes.post("/", createUserHandler);

userRoutes.put("/:id", updateUserHandler);

userRoutes.delete("/:id", deleteUserHandler);

//Exportamos la ruta de usuarios
module.exports = userRoutes;
