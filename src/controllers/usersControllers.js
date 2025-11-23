//Controllers de usuarios

const User = require("../models/User"); //importamos el modelo de usuario
//const bcrypt = require("bcrypt");

const createUserController = async (name, nickname, email, auth0Id, role) => {
  //const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await new User({
    name,
    nickname,
    email,
    //password: hashPassword,
    auth0Id,
    role,
  });
  await newUser.save();
  return newUser;
};
//----------------- este voy a usar para verificar si ya esta registrado ------------------------------
const getUserByEmailController = async (email) => {
  const userByEmail = await User.findOne({ email });
  if (!userByEmail) {
    throw new Error("Usuario no encontrado");
  }
  return userByEmail;
};
//----------------- ---------------------------------------------------- ------------------------------


//Los demas hice en clase pero POR AHORA no uso
const getAllUsersController = async () => {
  if (!User.length) {
    throw new Error("No hay usuarios registrados");
  }
  return await User.find();
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

const updateUserController = async (id, name, nickname, email) => {
  const newUser = { name, nickname, email };
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
  getUserByEmailController,
  getOneUserById,
  updateUserController,
  deleteUserController,
};
