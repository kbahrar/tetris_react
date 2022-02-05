const Game = require("./game.class")
const _Rooms = {}

class Room {
    constructor (name, player) {
        if (!player) throw new Error('incorrect player')
        if (Room.getRoom(name))
            throw new Error('room with this name already exist')
        this.name = name
        this.host = player
        this.players = { [player.name]: player }
        this.messages = []
        this.isLocked = false
        _Rooms[this.name] = this
    }

    get info() {
        return {
            name: this.name,
            host: this.host.name,
            isLocked: this.isLocked,
            players: Object.keys(this.players),
            messages: this.messages
        }
    }
    static getRoomsNames() {
        return Object.keys(_Rooms);
    }

    static getRoom(name) {
        return _Rooms[name]
    }

    add(player) {
        if (!player) throw new Error('incorrect player')
        if (this.isLocked) throw new Error("can't join this room")
        if (!this.players[player.name]) {
            this.players[player.name] = player
            return true
        }
        return false
    }

    startGame(player, listener) {
        if (this.host.name === player.name) {
            if (!this.game) {
                this.game = new Game(this)
                console.log(listener)
                this.listener = listener
            }
            return this.game.start()
        }
        return false
    }

    movePiece (player, key) {
        if (this.game) {
            this.game.engines[player.name].movePiece(key)
        }
        else
            throw new Error('no game started !')
    }
}

module.exports = Room;