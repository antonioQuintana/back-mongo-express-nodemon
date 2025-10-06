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

const getAllUsersController = async () => {
  if (!User.length) {
    throw new Error("No hay usuarios registrados");
  }
  return await User.find();
};
const getUserByNameController = async (name) => {
  const userByName = await User.find({ name });
  if (!userByName.length) {
    throw new Error("Usuario no encontrado");
  }
  return userByName;
};
const getOneUserById = async (id) => {
  console.log(id);
  const userById = await User.findById(id);
  console.log(userById);
  if (!userById) {
    throw new Error("Usuario no encontrado");
  }
  return userById;
};

const updateUserController = async (id, name, username, email) => {
  const newUser = { name, username, email };
  const userById = await User.findByIdAndUpdate(id, newUser, { new: true });

  return userById;
};
const deleteUserController = (id) => {
  const index = User.findIndex((user) => user.id === id);
  let deleteUser = null;
  if (index !== -1) {
    [deleteUser] = User.splice(index, 1); //¿por qué corchetes? porque es un arreglo??
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
