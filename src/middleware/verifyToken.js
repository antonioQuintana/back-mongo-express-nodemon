var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: "token requerido" });
  }
  try {
    jwt.verify(token.split(" ")[1], "secretKey", (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: "token invalido" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).send({ error: "token invalido" });
  }
};

module.exports = verifyToken;
