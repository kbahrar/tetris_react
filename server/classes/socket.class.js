const socketIo = require("socket.io");
const socketCookieParser = require('socket.io-cookie-parser');
const SocketSubScription = require('../subscriptions/socket.class');
const Player = require("./player.class")
const Room = require('./room.class')

const { ORIGIN } = require("../config")
const _sockets = {};

class Socket {
    run(server) {
        this.io = socketIo(server, {
            cors: {
                origin: ORIGIN,
                credentials: true,
            }
        })

        if (this.io) {
            this.io.use(socketCookieParser())
            this.io.use(this.middleware)
            this.io.on('connect', ((socket) => _sockets[socket.username] = new SocketSubScription(this, socket)).bind(this))
            // this.io.on("connect", (Socket) => {

                // Socket.on("login", this.login.bind(this));

                // Socket.on("users", () => {
                //     let users = this.GetUsers();
                //     this.io.emit("users", (users))
                // })

                // Socket.on("chat", (msg) => {
                //     this.io.emit("chat", ({
                //         sender: msg[0],
                //         msg: msg[1]
                //     }))
                // })

                // Socket.on("list room", () => {
                //     let rooms = Room.getRoomsNames();
                //     console.log(rooms)
                //     Socket.emit("list room", rooms);
                // })

                // Socket.on("create room", (data, callback) => {
                //     if (Room.getRoom(data[0])) {
                //         callback({status: "failed"})
                //     }
                //     else {
                //         Player.createRoom(data[0], data[1])
                //         let rooms = Room.getRoomsNames();
                //         console.log(rooms)
                //         this.io.emit("list room", rooms);
                //         callback({status: "ok"})
                //     }
                // })

                // Socket.on("disconnect", () => {
                //     for (let item in _sockets) {
                //         if (_sockets[item] === Socket.id)
                //             delete _sockets[item]
                //     }
                //     let users = this.GetUsers();
                //     this.io.emit("users", (users))
                // });
            // });
        }
    }

    getSocket(username) {
        return _sockets[username]
    }
    removeSocket(username) {
        delete _sockets[username]
    }
    middleware(socket, next) {
        if (socket?.request?.cookies?.name) {
            socket.username = socket.request.cookies.name
            return next()
        }
        return next(new Error('not authorized'))
    }
    close(cb) {
        if (this.io)
            this.io.close(cb)
    }
}

module.exports = Socket;