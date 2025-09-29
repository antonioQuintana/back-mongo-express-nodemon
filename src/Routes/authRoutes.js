const { Router } = require("express");
const authRoutes = Router();
const { registerHandler, loginHandler } = require("../handlers/authHandlers");

authRoutes.use("/register", registerHandler);
authRoutes.use("/login", loginHandler);

module.exports = authRoutes;
