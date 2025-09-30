const authorizationAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Acceso denegado" });
  }
  next();
};

module.exports = authorizationAdmin;
