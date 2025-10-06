const app = require("./src/server"); //importa el servidor
const mongoose = require("mongoose"); //importamos la conexión a la base de datos

require("dotenv").config({ quiet: true }); //importa el .env

const port = process.env.PORT || 3001; // Trae el puerto del archivo .env

function main() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB conectado");
      app.listen(port, () => console.log(`Servidor en puerto ${port}`));
    })
    .catch((err) => console.error(err));
}
main();
