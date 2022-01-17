const socketIo = require("socket.io");
const Player = require("./player.class")
const { ORIGIN } = require("../config")
var _sockets = []
class Socket {
    run(server) {
        this.io = socketIo(server, {
            cors: {
                origin: ORIGIN,
            }
        })

        if (this.io) {
            this.io.on("connection", (Socket) => {

                Socket.on("login", (auth, callback) => {
                    if (this.checkUserName(auth[0])) {
                        this.AddUser(auth)
                        callback({ status: "ok" })
                    }
                    else
                        callback({ status: "failed" })
                });

                Socket.on("users", () => {
                    let users = this.GetUsers();
                    this.io.emit("users", (users))
                })

                Socket.on("disconnect", () => {
                    for (let item in _sockets) {
                        if (_sockets[item] === Socket.id)
                            delete _sockets[item]
                    }
                    let users = this.GetUsers();
                    this.io.emit("users", (users))
                });
            });
        }
    }

    checkUserName(username) {
        for (let item in _sockets) {
            if (item === username)
                return false
        }
        return true
    }

    AddUser(auth) {
        var username = auth[0];
        var socket_id = auth[1];
        _sockets[username] = socket_id;
        new Player(username)
    }

    GetUsers() {
        var users = []
        for (let item in _sockets) {
            users.push(item)
        }
        return users
    }
}

module.exports = Socket;