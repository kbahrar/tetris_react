const Room = require("./room.class")
const checkInput = require('../util')
const _players = {}

class Player {
    constructor (name) {
        if (!/[A-Za-z0-9]{1,20}/.test(name))
            throw new Error('invalid username')
        if (Player.getPlayer(name))
            throw new Error("username already exist");
        this.name = name
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
            console.log(roomName)
            const room = Room.getRoom(roomName);
            if (room && room.add(this))
                this.room = room
            else
                this.room = new Room(roomName, this)
            return true
        }
        throw new Error('Player already in a room');
    }

    disconnect() {
        if (this.room) {
            this.room.exit(this)
            delete this.room
        }
        delete _players[this.name]
        return true
    }
}

module.exports = Player;