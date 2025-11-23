const mongoose = require("mongoose");
/*Se elimina el password ya que los usuarios ingresaran con auth0
 *que maneja el password de manera interna, se registra el id de auth0 */

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Aseguramos que el email sea único
    //password: { type:String, required: true },
    auth0Id: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Rol del usuario
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
