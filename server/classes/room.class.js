var _Rooms = []
class Room {
    constructor (name, player) {
        this.name = name
        this.host = player
        this.players = [player]
        _Rooms[this.name] = this
    }

    static getRoomsNames() {
        let rooms = [];
        for (let room in _Rooms) {
            rooms.push(room)
        }
        return rooms
    }

    static getRoom(name) {
        return _Rooms[name]
    }
}

module.exports = Room;