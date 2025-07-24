const http = require("node:http");
const socketio = require(`socket.io`);
const server = http.createServer();

const io = socketio(server, {
  cors: { origin: "*" },
});

//Eventos de conexión
io.on("connection", socket => {
  //rsconsole.log("se ha concectado un cliente");
  //Mensaje de nuevo cliente conectado
  socket.broadcast.emit("chat_message_server", {
    username: "INFO",
    text: "Se ha conectado un nuevo usuario",
  });

  //Emitir al front el numero de usarios conectado
  io.emit("clients_count", io.engine.clientsCount);

  socket.on("chat_message", data => {
    io.emit("chat_message_server", data);
  });
});

server.listen(process.env.PORT || 3000);
