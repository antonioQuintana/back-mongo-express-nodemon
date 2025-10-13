const Joi = require("joi");
const {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderByIdController,
} = require("../controllers/orderController");

const orderSchema = Joi.object({
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
  status: Joi.string().valid("Pending", "Shipped", "Delivered"),
});

// Crear orden
const createOrderHandler = async (req, res) => {
  const { error, value } = orderSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  console.log(value);
  try {
    const result = await createOrderController(value);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar orden
const updateOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateOrderController(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Eliminar orden
const deleteOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteOrderController(id);
    res.status(200).json({ message: "Orden eliminada", result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Obtener todas las órdenes
const getAllOrdersHandler = async (req, res) => {
  try {
    const result = await getAllOrdersController();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener orden por ID
const getOrderByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getOrderByIdController(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
};
