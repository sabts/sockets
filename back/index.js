const http = require("node:http");
const socketio = require(`socket.io`);
const Message = require("./models/message.model");

const { OpenAI } = require("openai");
const { sendGpt } = require("./utils/gpt");

const server = http.createServer();

require("./config/db");

//cliente de open AI
const client = new OpenAI({
  apiKey:
    "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",
});

const io = socketio(server, {
  cors: { origin: "*" },
});

//Eventos de conexión
io.on("connection", async socket => {
  //rsconsole.log("se ha concectado un cliente");
  //Mensaje de nuevo cliente conectado
  socket.broadcast.emit("chat_message_server", {
    //el broadcast se le en todos menos en el usario que se esta conectando
    username: "INFO",
    text: "Se ha conectado un nuevo usuario",
  });

  //Emitir al front el numero de usarios conectado
  io.emit("clients_count", io.engine.clientsCount); // el emit se lo envia a todos

  //Recuperar los ultimos 5 mensajes
  const messages = await Message.find().sort("-createdAt").limit(5);
  socket.emit("init_data", messages); // se muestra solo al usario que se conecta

  //suscripcion al evento de messages en  el front
  socket.on("chat_message", async data => {
    await Message.create(data);
    io.emit("chat_message_server", data);
  });

  // suscripción evento "ai_question"
  socket.on("ai_question", async text => {
    console.log(text);
    const response = await sendGpt(client, text);
    io.emit("chat_message_server", {
      username: "Chat",
      text: response,
    });
  });

  //desuscribir de messages (desconectarse)
  io.on("disconnect", () => {});
});

server.listen(process.env.PORT || 3000);
