type TUser = {
  name: string;
  room: string;
  id: string;
  socketId: string;
};
class Users {
  users: TUser[];

  constructor() {
    this.users = [];
  }
  add(name: string, room: string, id: string, socketId: string) {
    this.users.push({
      name,
      room,
      id,
      socketId,
    });
  }
  get(id: string) {
    return this.users.find((u) => u.socketId === id);
  }
  remove(id: string) {
    const user = this.get(id);
    if (user) {
      this.users = this.users.filter((u) => u.socketId !== id);
    }
    return user;
  }
  getRoom(room: string) {
    return this.users.filter((u) => u.room === room);
  }
}
export default function () {
  return new Users();
}
