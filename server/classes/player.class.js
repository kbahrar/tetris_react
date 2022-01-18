const Room = require("./room.class")
var _players = []

class Player {
    constructor (name) {
        this.name = name
        this.room = null
        _players[this.name] = this
    }

    static createRoom (roomName, playerName) {
        this.room = new Room(roomName, _players[playerName])
    }
}

module.exports = Player;