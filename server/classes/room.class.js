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
}

module.exports = Room;