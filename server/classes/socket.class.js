const socketIo = require("socket.io");
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

                Socket.on("disconnect", () => {
                    for (let item in _sockets) {
                        if (_sockets[item] === Socket.id)
                            delete _sockets[item]
                    }
                })
            });
        }
    }

    checkUserName(username) {
        console.log(username)
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
    }
}

module.exports = Socket;