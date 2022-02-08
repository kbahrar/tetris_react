const socketIo = require("socket.io");
const socketCookieParser = require('socket.io-cookie-parser');
const SocketSubScription = require('../subscriptions/socket.class');

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
        }
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
}

module.exports = Socket;