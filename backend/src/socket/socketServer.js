const socketIo = require("socket.io");
const http = require("http");
const redis = require("redis");
const bcrypt = require("bcrypt");

const setupSocketServer = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const client = redis.createClient({
    socket: {
      host: "redis",
      port: 6379,
    },
  });

  client.on("error", (error) => {
    console.error(`Redis error: ${error}`);
  });

  client.connect().catch((error) => {
    console.error(`Failed to connect to Redis: ${error}`);
  });

  const updateRoomMembers = async (roomId) => {
    const members = await client.sMembers(`room:${roomId}:members`);
    io.to(roomId).emit("updateMembers", members);
    await updateInitialCode(roomId);
  };

  const updateInitialCode = async (roomId) => {
    let code = await client.get(`room:${roomId}:codeUpdates`, -1, -1);
    code = code === null || code.length === 0 ? "" : code;
    io.to(roomId).emit("initialCode", { code });
  };

  const deleteRoom = async (roomId) => {
    try {
      await client.del(`room:${roomId}:password`);
      await client.del(`room:${roomId}:members`);
      const socketsInRoom = await io.in(roomId).fetchSockets();
      for (const socket of socketsInRoom) {
        socket.leave(roomId);
      }

      console.log(`Room ${roomId} has been deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting room ${roomId}:`, error);
    }
  };

  io.on("connection", (socket) => {
    console.log(`Connection Successful. Socket ID: ${socket.id}`);

    socket.on(
      "createRoom",
      async ({ username, roomId, password }, callback) => {
        try {
          // const savedPassword = await client.get(`room:${roomId}:password`);
          // if (savedPassword) {
          //   return socket.emit("error", {
          //     message: "room_exists",
          //     socket_error: "room_exists",
          //   });
          // }

          socket.join(roomId);
          const hashedPassword = await bcrypt.hash(password, 10);
          await client.set(`room:${roomId}:password`, hashedPassword);
          await client.sAdd(`room:${roomId}:members`, username);
          await client.set(`socket:${socket.id}:username`, username);
          callback({ success: true });
          io.to(roomId).emit("userJoined", {
            username: username,
            userId: socket.id,
          });
          await updateRoomMembers(roomId);
        } catch (error) {
          console.error(`Error in createRoom: ${error}`);
          return socket.emit("error", {
            message: "create_room",
            socket_error: error,
          });
        }
      }
    );

    socket.on("joinRoom", async ({ username, roomId, password }, callback) => {
      try {
        const savedPassword = await client.get(`room:${roomId}:password`);
        if (!savedPassword) {
          return socket.emit("error", {
            message: "room_not_exists",
            socket_error: "room_not_exists",
          });
        }

        const isMatch = await bcrypt.compare(password, savedPassword);
        if (!isMatch) {
          return socket.emit("error", {
            message: "wrong_password",
            socket_error: "wrong_password",
          });
        }

        socket.join(roomId);
        await client.sAdd(`room:${roomId}:members`, username);
        await client.set(`socket:${socket.id}:username`, username);
        callback({ success: true });
        io.to(roomId).emit("userJoined", {
          username: username,
          userId: socket.id,
        });
        await updateRoomMembers(roomId);
      } catch (error) {
        console.error(`Error in joinRoom: ${error}`);
        return socket.emit("error", {
          message: "join_room",
          socket_error: error,
        });
      }
    });

    socket.on("sendMessage", async ({ roomId, username, message }) => {
      const timestamp = Date.now();
      const messageData = {
        roomId,
        username,
        userId: socket.id,
        message,
        timestamp,
      };
      await client.rPush(
        `room:${roomId}:messages`,
        JSON.stringify(messageData)
      );
      io.to(roomId).emit("newMessage", messageData);
    });

    

    socket.on("codeUpdate", async ({ roomId, username, code }) => {
      console.log("Hello there",code);

      const timestamp = Date.now();
      const codeUpdateData = {
        roomId,
        username,
        userId: socket.id,
        code,
        timestamp,
      };
      await client.rPush(
        `room:${roomId}:codeUpdates`,
        JSON.stringify(codeUpdateData)
      );
      socket.to(roomId).emit("receiveCodeUpdate", { code });
    });

    socket.on("leaveRoom", async ({ roomId }) => {
      try {
        const username = await client.get(`socket:${socket.id}:username`);

        if (!username) {
          return;
        }

        await client.sRem(`room:${roomId}:members`, username);
        io.to(roomId).emit("userLeft", {
          username: username,
          userId: socket.id,
        });
        await updateRoomMembers(roomId);

        const remainingMembers = await client.sCard(`room:${roomId}:members`);
        if (remainingMembers === 0) {
          await deleteRoom(roomId);
        }
      } catch (error) {
        console.error("Error in leaveRoom:", error);
      }
    });
  });

  return server;
};

module.exports = setupSocketServer;
