const http = require("node:http");
const socketio = require(`socket.io`);
const server = http.createServer();

const io = socketio(server, {
  cors: { origin: "*" },
});

//Eventos de conexión
io.on("connection", socket => {
  console.log("se ha concectado un cliente");
});

server.listen(process.env.PORT || 3000);
