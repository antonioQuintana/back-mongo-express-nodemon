const Cart = require("../models/Cart");

// Crear carrito
const createCartController = async ({ userId, products, totalAmount }) => {
  console.log(userId);
  const newCart = new Cart({
    userId,
    products,
    totalAmount,
    createdAt: new Date(),
  });
  return await newCart.save();
};

// Actualizar carrito
const updateCartController = async (id, data) => {
  const updatedCart = await Cart.findByIdAndUpdate(id, data, { new: true });
  if (!updatedCart) throw new Error("Carrito no encontrado");
  return updatedCart;
};

// Eliminar carrito
const deleteCartController = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id);
  if (!deletedCart) throw new Error("Carrito no encontrado");
  return deletedCart;
};

// Obtener todos los carritos
const getAllCartsController = async () => {
  return await Cart.find().populate("userId");
};

// Obtener carrito por ID
const getCartByIdController = async (id) => {
  const cart = await Cart.findById(id).populate("userId");
  if (!cart) throw new Error("Carrito no encontrado");
  return cart;
};

module.exports = {
  createCartController,
  updateCartController,
  deleteCartController,
  getAllCartsController,
  getCartByIdController,
};
