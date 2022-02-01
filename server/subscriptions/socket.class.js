const Player = require('../classes/player.class');
const Room = require('../classes/room.class')

module.exports = class SocketSubscription {
    constructor(master, socket) {
        try {
            this.master = master
            this.io = master.io
            this.socket = socket
            this.player = new Player(this.socket.username)
            this.socket.emit('connected', this.player)
            this.handleEvents()
        } catch (error) {
            this.handleError(error)
        }
    }

    handleEvents() {
        this.socket.on("list room", this.listRoom.bind(this));
        this.socket.on("users", this.GetUsers.bind(this));
    }

    listRoom() {
        let rooms = Room.getRoomsNames();
        this.socket.emit("list room", rooms);
    }

    GetUsers() {
        var users = Player.getPlayersNames();
        this.io.emit("users", users);
    }

    handleError(error) {
        this.socket.emit('error', error.message);
    }
}