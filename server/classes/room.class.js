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
                this.listener = listener
            }
            return this.game.start()
        }
        return false
    }

    restartGame(player) {
        if (this.host.name === player.name) {
            if (!this.game) {
                this.game = new Game(this)
            }
            return this.game.restart()
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

    exit(player) {
        if (player) {
            const players = Object.keys(this.players)
            if (players.length === 1 && this.game)
                this.game.quit()
            if (this.host.name === player.name && players.length > 1)
                this.host = this.players[players[1]]
            else if (this.host.name === player.name) delete _Rooms[this.name]
            if (this.game && this.game.engines && this.game.engines[player.name])
                this.game.removePlayer(this.game.engines[player.name].player)
            delete this.players[player.name].room
            delete this.players[player.name]
            return true
        }
        return false
    }
}

module.exports = Room;