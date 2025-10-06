const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true }, // Aseguramos que el username sea único
    email: { type: String, required: true }, // Aseguramos que el email sea único
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Rol del usuario
  },
  { versionKey: false }
); // Agrega campos createdAt y updatedAt automáticamente

const User = mongoose.model("User", userSchema);

module.exports = User;
