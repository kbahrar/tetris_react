module.exports = class GameSubscription {
    static start() {
        if (this.player && this.player.room) {
            const room = this.player.room
            return room.startGame(this.player)
        } else
            throw new Error('you need to join room first')
    }
}