const { Router } = require("express");

const userRoutes = Router();
const {
  getUserByEmailHandler,
  createUserHandler,

} = require("../handlers/userHandlers");
const verifyToken = require("../middleware/verifyToken");
const authorizationAdmin = require("../middleware/authorizeMiddleware");

//Usuarios
//userRoutes.get("/", verifyToken, authorizationAdmin);

userRoutes.get("/:email", getUserByEmailHandler);

userRoutes.post("/", createUserHandler);

//userRoutes.delete("/:id", deleteUserHandler);

//Exportamos la ruta de usuarios
module.exports = userRoutes;
