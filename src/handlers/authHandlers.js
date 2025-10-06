const User = require("../models/User");
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

const {
  registerController,
  loginController,
} = require("../controllers/authController");

const registerHandler = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).send({ error: "El usuario ya existe" });
  }
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const { name, username, email, password, role } = req.body;
    const response = await registerController(
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
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { registerHandler, loginHandler };
