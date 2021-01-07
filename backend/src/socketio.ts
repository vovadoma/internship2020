import { Socket } from "socket.io";
import usersClass from "./users";

type TUser = {
  name: string;
  room: string;
  id: string;
  socketId: string;
};

export default function socketIO(app: Function) {
  const users = usersClass();
  const message = (name: string, message: string, id?: string) => ({
    name,
    message,
    id,
  });

  let io = require("socket.io")(app, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("joinUser", (data, callback) => {
      users.remove(socket.id);
      socket.join(data.room);
      io.to(data.room).emit("users:upgrade", users.getRoom(data.room));
    });

    socket.on("joinChat", (data, callback) => {
      users.remove(socket.id);
      socket.join(data.room);
      users.add(data.name, data.room, data.id, socket.id);
      io.to(data.room).emit("users:update", users.getRoom(data.room));
      socket.emit("message:new", message("Admin", `Welcome, ${data.name}!`));
    });

    socket.on("message:create", (data, callback) => {
      if (!data) {
        callback(`Message can't be empty`);
      } else {
        const user = users.get(socket.id);
        console.log(users.get(socket.id));
        if (user) {
          io.to(user.room).emit(
            "message:new",
            message(data.name, data.message, data.id)
          );
        }
        callback();
      }
    });

    socket.on("disconnect", (data) => {
      const user = users.remove(socket.id);
      if (user) {
        io.to(data.room).emit(
          "message:new",
          message("Admin", `${data.name}, left.`)
        );
        io.to(data.room).emit("users:update", users.getRoom(data.room));
      }
    });
  });
}
