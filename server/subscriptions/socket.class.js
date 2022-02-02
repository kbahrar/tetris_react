const Player = require('../classes/player.class');
const Room = require('../classes/room.class')
const RoomSubscription = require('../subscriptions/room.class')

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
        this.socket.on("create room", this.CreateRoom.bind(this));
    }

    listRoom() {
        let rooms = Room.getRoomsNames();
        this.socket.emit("list room", rooms);
    }

    GetUsers() {
        var users = Player.getPlayersNames();
        this.io.emit("users", users);
    }

    CreateRoom (name) {
        try {
            const room = RoomSubscription.create.call(this, name);
            if (room) {
                this.socket.join(room.name);
                this.socket.emit('room joined', room)
            }
        }
        catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        this.socket.emit('error', error.message);
    }
}