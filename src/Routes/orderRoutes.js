const { Router } = require("express");

const orderRoutes = Router();

const {
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
} = require("../handlers/orderHandlers");

orderRoutes.post("/", createOrderHandler);
orderRoutes.put("/:id", updateOrderHandler);
orderRoutes.delete("/:id", deleteOrderHandler);
orderRoutes.get("/", getAllOrdersHandler);
orderRoutes.get("/:id", getOrderByIdHandler);

module.exports = orderRoutes;
