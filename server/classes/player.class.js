const Room = require("./room.class")
const _players = {}

class Player {
    constructor (name) {
        if (Player.getPlayer(name))
            throw new Error("username already exist");
        this.name = name
        this.room = null
        _players[this.name] = this
    }

    static getPlayersNames() {
        return Object.keys(_players);
    }

    static getPlayers () {
        return _players
    }

    static getPlayer (name) {
        return _players[name]
    }

    createRoom (roomName) {
        if (!this.room) {
            this.room = new Room(roomName, this)
            return this.room
        }
        throw new Error('Player already in a room');
    }

    joinRoom (roomName) {
        if (!this.room) {
            const room = Room.getRoom(roomName);
            if (!room) throw new Error('room doesnt exist')
            if (room.add(this))
                this.room = room
            else
                this.room = new Room(roomName, this)
            return true
        }
        throw new Error('Player already in a room');
    }
}

module.exports = Player;