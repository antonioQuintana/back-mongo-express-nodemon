const mongoose = require("mongoose");

//const users = require("../db/database"); no se usa mas
const User = require("../models/User"); //importamos el modelo de usuario
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/* const registerController = async (name, username, email, password, role) => {
  const userExist = users.some((user) => user.email === email); //some devuelve true o false
  if (userExist) {
    throw new Error("El usuario ya existe");
  }

  const id = users.length + 1; //tamaño del array de users + 1
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = { id, name, username, email, password: hashPassword, role };
  if (!name || !username || !email || !password) {
    throw new Error("Faltan datos obligatorios");
  }
  users.push(newUser);
  return newUser;
}; */
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
