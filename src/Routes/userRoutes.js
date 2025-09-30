const { Router } = require("express");

const userRoutes = Router();
const {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../handlers/userHandlers");
const verifyToken = require("../middleware/verifyToken");
const authorizationAdmin = require("../middleware/authorizeMiddleware");

//Usuarios
userRoutes.get("/", verifyToken, authorizationAdmin, getAllUsersHandler);

userRoutes.get("/:id", getOneUserHandler);

userRoutes.post("/", createUserHandler);

userRoutes.put("/:id", updateUserHandler);

userRoutes.delete("/:id", deleteUserHandler);

//Exportamos la ruta de usuarios
module.exports = userRoutes;
