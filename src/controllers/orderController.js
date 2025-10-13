//Controlador de ordenes
const Order = require("../models/Order");

const mongoose = require("mongoose"); //usar para validar id de objetos

// Crear orden
const createOrderController = async ({
  userID,
  products,
  totalAmount,
  status,
}) => {
  const newOrder = new Order({
    userID,
    products,
    totalAmount,
    status,
    orderDate: new Date(),
  });
  return await newOrder.save();
};

// Actualizar orden
const updateOrderController = async (id, data) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });
  if (!updatedOrder) throw new Error("Orden no encontrada");
  return updatedOrder;
};

// Eliminar orden
const deleteOrderController = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) throw new Error("Orden no encontrada");
  return deletedOrder;
};

// Obtener todas las órdenes
const getAllOrdersController = async () => {
  return await Order.find().populate("userID").populate("products.productID");
};

// Obtener orden por ID
const getOrderByIdController = async (id) => {
  const order = await Order.findById(id)
    .populate("userID")
    .populate("products.productID");
  if (!order) throw new Error("Orden no encontrada");
  return order;
};

module.exports = {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
};
