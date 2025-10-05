const app = require("./src/server"); //importa el servidor
const mongoose = require("mongoose"); //importamos la conexión a la base de datos

require("dotenv").config({ quiet: true }); //importa el .env

const port = process.env.PORT || 3001; // Trae el puerto del archivo .env

async function main() {
  try {
    await mongoose.connection;
    app.listen(port, console.log("listening on port", port));

    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost: ${port}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}
main();

/* const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor funcionando correctamente 🚀');
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
 */ //esto seria sin express
