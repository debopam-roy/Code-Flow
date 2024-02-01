import { io } from "socket.io-client";

const initSocket = async () => {
  const socket = io.connect("http://localhost:4000/editor/");
  
  socket.on('connect_error', (error) => {
    console.log("Hello therererererere!");
    console.error('Socket connection error:', error);
  });
  return socket;
};

export default initSocket;
