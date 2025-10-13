const Cart = require("../models/Cart");

// Crear carrito
const createCartController = async ({ userID, products, totalAmount }) => {
  const newCart = new Cart({
    userID,
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
  return await Cart.find().populate("userID").populate("products.productID");
};

// Obtener carrito por ID
const getCartByIdController = async (id) => {
  const cart = await Cart.findById(id)
    .populate("userID")
    .populate("products.productID");
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
