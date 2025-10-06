const {
  getAllUsersController,
  getUserByNameController,
  getOneUserById,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/usersControllers");

const Joi = require("joi");
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])[^\s]{8,16}$/)
    ) // Al menos un dígito, una letra mayúscula, una letra minúscula, un carácter especial, sin espacios y entre 8 y 16 caracteres
    .required()
    .messages({
      "string.pattern.base": `La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una letra mayúscula, una letra minúscula y un carácter especial, y no debe contener espacios.`,
    }),
  role: Joi.string().valid("user", "admin").default("user"),
});

const getAllUsersHandler = async (req, res) => {
  const { name } = req.query;
  if (name) {
    const response = await getUserByNameController(name);
    if (!response) {
      return res.status(404).send("Usuario no encontrado");
    }
    return res.status(200).send(response);
  } else {
    const response = await getAllUsersController();
    return res.status(200).send(response);
  }
};

const getOneUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getOneUserById(id);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(404).send("Usuario no encontrado");
  }
};

const createUserHandler = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const { name, username, email, password, role } = req.body;
    const response = await createUserController(
      name,
      username,
      email,
      password,
      role
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;
  const response = await updateUserController(id, name, username, email);
  if (!response) {
    return res.status(404).send("Usuario no encontrado");
  }
  return res.status(200).send(response);
};
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  const response = deleteUserController(Number(id));
  if (!response) {
    return res.status(404).send("Usuario no encontrado");
  }
  return res.status(200).send(response);
};
module.exports = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
