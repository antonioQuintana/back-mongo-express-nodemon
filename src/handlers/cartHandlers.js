const {
  createCartController,
  updateCartController,
  deleteCartController,
  getAllCartsController,
  getCartByIdController,
} = require("../controllers/cartController");

const Joi = require("joi");

const cartSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  totalAmount: Joi.number().min(0).required(),
});

// Crear carrito
const createCartHandler = async (req, res) => {
  const { error, value } = cartSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const result = await createCartController(value);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar carrito
const updateCartHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateCartController(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Eliminar carrito
const deleteCartHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCartController(id);
    res.status(200).json({ message: "Carrito eliminado", result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Obtener todos los carritos
const getAllCartsHandler = async (req, res) => {
  try {
    const result = await getAllCartsController();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener carrito por ID
const getCartByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCartByIdController(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createCartHandler,
  updateCartHandler,
  deleteCartHandler,
  getAllCartsHandler,
  getCartByIdHandler,
};
