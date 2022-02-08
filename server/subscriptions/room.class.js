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
            return room.info
        }
        return false
    }

    static getInfo() {
        if (this.player && this.player.room) {
            return this.player.room.info
        }
        return null
    }

    static exit() {
        return this.player.room.exit(this.player)
    }
}