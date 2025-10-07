const {
  getAllProductsController,
  getOneProductById,
  createProductController,
  getProductByNameController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productsController");

const Joi = require("joi");
const productSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  description: Joi.string().min(10).max(200).required(),
  price: Joi.number().positive().required(),
});

const getAllProductsHandler = async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const response = await getProductByNameController(name);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(401).send(error.message);
    }
  } else {
    const response = await getAllProductsController();
    return res.status(200).send(response);
  }
};

const getOneProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getOneProductById(id);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(404).send("Producto no encontrado");
  }
};
const createProductHandler = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const { name, description, price } = req.body;
    const response = await createProductController(name, description, price);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const response = await updateProductController(
      id,
      name,
      description,
      price
    );
    if (!response) {
      return res.status(404).send("Producto no encontrado");
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteProductController(id);
    if (!response) {
      return res.status(404).send("Producto no encontrado");
    }
    return res.status(200).send(response);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProductsHandler,
  getOneProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
