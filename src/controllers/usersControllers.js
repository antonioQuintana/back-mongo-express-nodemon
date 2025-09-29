//Controllers de usuarios
const users = require("../db/database");
const bcrypt = require("bcrypt");

const createUserController = async (name, username, email, password, role) => {
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

const getAllUsersController = () => {
  return users;
};
const getUserByNameController = (name) => {
  const userByName = users.filter(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );
  if (!userByName.length) {
    throw new Error("Usuario no encontrado");
  }
  return userByName;
};
const getOneUserById = (id) => {
  const userById = users.find((user) => user.id === id);
  if (!userById) {
    throw new Error("Usuario no encontrado");
  }
  return userById;
};

const updateUserController = (id, name, username, email) => {
  const newUser = { name, username, email };
  const userById = users.find((user) => user.id === id);
  if (userById) {
    /* userById.name = newUser.name;
        userById.username = newUser.username;
        userById.email = newUser.email; */
    Object.assign(userById, newUser);
    return userById;
  }
  throw new Error("Usuario no encontrado");
};
const deleteUserController = (id) => {
  const index = users.findIndex((user) => user.id === id);
  let deleteUser = null;
  if (index !== -1) {
    [deleteUser] = users.splice(index, 1); //¿por qué corchetes? porque es un arreglo??
    return deleteUser;
  }
  return null;
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUserByNameController,
  getOneUserById,
  updateUserController,
  deleteUserController,
};
