import { io } from "socket.io-client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
const socket = io("http://localhost:3000");

const Chat = () => {
  const { register, handleSubmit } = useForm();
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    socket.on("chat_message_server", data =>
      setMessages(messages => [...messages, data])
    );

    socket.on("clients_count", clientsCount =>
      setClients(clients => [...clients, clientsCount])
    );

    //clean up funtion
    return () => {
      socket.off("chat_message_server");
      socket.off("clients_count");
    };
  }, []);

  const submit = data => {
    socket.emit("chat_message", data);
  };

  return (
    <>
      <header>
        <h1>Chat</h1>
        <h4>Clientes conectados: {clients.length}</h4>
      </header>
      <main>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.text}</li>
          ))}
        </ul>
      </main>
      <footer>
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label>username</label>
            <input type="text" {...register("username")} />
          </div>
          <div>
            <label>message</label>
            <input type="text" {...register("text")} />
          </div>
          <input type="submit" value="send" />
        </form>
      </footer>
    </>
  );
};

export default Chat;
