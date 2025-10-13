//Controlador de ordenes
const Order = require("../models/Order");

const mongoose = require("mongoose"); //usar para validar id de objetos

// Crear orden
const createOrderController = async ({
  userId,
  products,
  totalAmount,
  status,
}) => {
  const newOrder = new Order({
    userId,
    products,
    totalAmount,
    status,
    orderDate: new Date(),
  });

  return await newOrder.save();
};

// Actualizar orden
const updateOrderController = async (id, data) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, data, {
    new: true,
  });
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
  return await Order.find().populate("userId");
};

// Obtener orden por ID de usuario
const getOrderByIdController = async (userId) => {
  const order = await Order.find({ userId }).populate("userId", "name email"); //trae solamente name y email

  if (!order) throw new Error("El usuario no ha realizado ninguna orden");
  return order;
};

module.exports = {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
};
