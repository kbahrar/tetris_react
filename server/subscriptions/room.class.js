module.exports = class RoomSubscription {
    static create(name) {
        if (this.player && this.player.createRoom(name)) {
            const room = this.player.room
            return room.info
        }
        return null
    }

    static join(name) {
        if (this.player && this.player.joinRoom(name)) {
            const room = this.player.room
            console.log(room.info)
            return room.info
        }
        return false
    }
}