const app = require("./src/server"); //importa el servidor

require("dotenv").config({ quiet: true }); //importa el .env

const port = process.env.PORT || 3001; // Trae el puerto del archivo .env

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost: ${port}`);
});

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
