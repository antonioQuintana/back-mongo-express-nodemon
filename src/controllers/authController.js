const users = require("../db/database");
const bcrypt = require("bcrypt");

const registerController = async (name, username, email, password, role) => {
  const userExist = users.some((user) => user.email === email); //some devuelve true o false
  if (userExist) {
    throw new Error("El usuario ya existe");
  }

  const id = users.length + 1; //tamaño del array de users + 1
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  const newUser = { id, name, username, email, password: hashPassword, role };
  if (!name || !username || !email || !password) {
    throw new Error("Faltan datos obligatorios");
  }
  users.push(newUser);
  return newUser;
};
const loginController = async (email, password) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Contraseña incorrecta");
  }
  // Devuelve el usuario o un mensaje de éxito
  return { message: "Login exitoso", user };
};

module.exports = { registerController, loginController };
