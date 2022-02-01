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
    static createRoom (roomName, playerName) {
        this.room = new Room(roomName, _players[playerName])
    }
}

module.exports = Player;