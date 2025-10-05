//Controllers de usuarios

const User = require("../models/User"); //importamos el modelo de usuario
const bcrypt = require("bcrypt");

const createUserController = async (name, username, email, password, role) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await new User({
    name,
    username,
    email,
    password: hashPassword,
    role,
  });
  await newUser.save();
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
