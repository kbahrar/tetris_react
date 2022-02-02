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
        return false
    }
}

module.exports = Player;