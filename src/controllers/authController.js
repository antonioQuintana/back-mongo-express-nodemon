const User = require("../models/User"); //importamos el modelo de usuario
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const registerController = async (name, username, email, password, role) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    username,
    email,
    password: hashPassword,
    role,
  });

  await newUser.save();
  return newUser;
};

const loginController = async (email, password) => {
  //const user = users.find((user) => user.email === email);
  const user = await User.findOne({ email }); // lean() para obtener un objeto JS simple en lugar de un documento Mongoose
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Contraseña incorrecta");
  }
  const token = jwt.sign({ id: user.id, role: user.role }, "secretKey", {
    expiresIn: "1h",
  });
  // Elimina la propiedad password del objeto user
  const { password: _, ...userWithoutPassword } = user;
  // Devuelve el usuario o un mensaje de éxito
  return { message: "Login exitoso", token, user: userWithoutPassword };
};

module.exports = { registerController, loginController };
