const getAllUsersHandler = (req, res) => {
  const { name } = req.query;
  if (name) {
    return res.send(`Traer el usuario con nombre: ${name}`);
  } else {
    return res.send("Traer todos los usuarios");
  }
};

const getOneUserHandler = (req, res) => {
  const { id } = req.params;
  res.send(`Traer un usuario con ID: ${id}`);
};

const createUserHandler = (req, res) => {
  const { id, name, username, email } = req.body;
  res.send(
    `Usuario ${name} creado con el ID: ${id}, username: ${username} y email: ${email}`
  );
};

const updateUserHandler = (req, res) => {
  res.send("Usuario modificado");
};
const deleteUserHandler = (req, res) => {
  res.send("Usuario eliminado");
};
module.exports = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
