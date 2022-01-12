const socketIo = require("socket.io");
const { ORIGIN } = require("../config")
var _sockets = {}
class Socket {
    run(server) {
        this.io = socketIo(server, {
            cors: {
                origin: ORIGIN,
            }
        })

        if (this.io) {
            this.io.on("connection", (Socket) => {
                console.log(Socket.id)
            });
        }
    }
}

module.exports = Socket;