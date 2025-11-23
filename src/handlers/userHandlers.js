const {
  getAllUsersController,
  getUserByEmailController,
  getOneUserById,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/usersControllers");

const Joi = require("joi");
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  nickname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  /*password: Joi.string()
    .pattern(
      new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])[^\s]{8,16}$/)
    ) // Al menos un dígito, una letra mayúscula, una letra minúscula, un carácter especial, sin espacios y entre 8 y 16 caracteres
    .required()
    .messages({
      "string.pattern.base": `La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una letra mayúscula, una letra minúscula y un carácter especial, y no debe contener espacios.`,
    }),*/
  auth0Id: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

const getUserByEmailHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await getUserByEmailController(email);
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
    const { name, nickname, email, auth0Id, role } = req.body;
    const response = await createUserController(
      name,
      nickname,
      email,
      auth0Id,
      role
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
/*
const getAllUsersHandler = async (req, res) => {
  const { email } = req.query;
  if (email) {
    const response = await getUserByEmailController(email);
    if (!response) {
      return res.status(404).send("Usuario no encontrado");
    }
    return res.status(200).send(response);
  } else {
    const response = await getAllUsersController();
    return res.status(200).send(response);
  }
};
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { name, nickname, email } = req.body;
  const response = await updateUserController(id, name, nickname, email);
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
};*/
module.exports = {
  getUserByEmailHandler,
  createUserHandler,
};
