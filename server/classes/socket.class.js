const socketIo = require("socket.io");
const socketCookieParser = require('socket.io-cookie-parser');
const SocketSubScription = require('../subscriptions/socket.class');

const { ORIGIN } = require("../config")
const _sockets = {};

class Socket {
    run(server, port) {
        if (port)
            this.io = socketIo(port, {
                transports: ['websocket', 'polling'],
                cors: {
                    origin: ORIGIN,
                    credentials: true,
                },
        })
        else if (server) {
            this.io = new socketIo.Server(server, {
                cors: {
                    origin: ORIGIN,
                    credentials: true,
                }
            })
        }

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

    close(cb) {
        if (this.io)
            this.io.close(cb)
    }
}

module.exports = Socket;