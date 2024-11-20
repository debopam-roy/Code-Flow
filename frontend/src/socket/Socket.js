import { io } from "socket.io-client";

// URL for your backend server
const URL = "http://localhost:4000";

export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false,
});
